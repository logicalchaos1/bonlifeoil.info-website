-- Prune the auto-generated blog down to one post per town.
--
-- The seo-cron job produced ~1,900 near-identical AI posts (dozens per town,
-- many with duplicate titles). That pattern reads as scaled spam to Google and
-- drags down the whole domain. We keep the single best post per town and
-- archive the rest. Nothing is deleted: archived posts keep their content and
-- point at the kept post via redirect_slug, so old URLs redirect instead of 404.
--
-- To undo: UPDATE public.blog_posts SET status = 'published', redirect_slug = NULL
--          WHERE status = 'archived' AND redirect_slug IS NOT NULL;

-- 1. Stop the generator from refilling the blog.
DO $$
BEGIN
  PERFORM cron.unschedule('seo-automation-cycle');
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'seo-automation-cycle was not scheduled';
END $$;

-- 2. Where each archived post should redirect.
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS redirect_slug TEXT;

-- 3. Keep one post per town: prefer slugs without the collision suffix
--    (-m + 7 base36 chars from Date.now()), then the longest, then the oldest.
WITH ranked AS (
  SELECT
    id,
    town_id,
    slug,
    row_number() OVER (
      PARTITION BY town_id
      ORDER BY (slug ~ '-m[a-z0-9]{7}$') ASC, word_count DESC NULLS LAST, published_at ASC
    ) AS rn
  FROM public.blog_posts
  WHERE status = 'published' AND town_id IS NOT NULL
),
kept AS (
  SELECT town_id, slug FROM ranked WHERE rn = 1
)
UPDATE public.blog_posts b
SET status = 'archived', redirect_slug = kept.slug
FROM ranked
JOIN kept ON kept.town_id = ranked.town_id
WHERE b.id = ranked.id AND ranked.rn > 1;

-- 4. Let the site look up a redirect without exposing archived post content.
CREATE OR REPLACE FUNCTION public.get_blog_redirect(p_slug TEXT)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT redirect_slug FROM public.blog_posts
  WHERE slug = p_slug AND status = 'archived'
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_blog_redirect(TEXT) TO anon, authenticated;
