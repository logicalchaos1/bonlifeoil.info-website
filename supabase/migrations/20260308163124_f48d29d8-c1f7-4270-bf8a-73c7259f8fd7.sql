
-- Table: DR towns with hotels for SEO targeting
CREATE TABLE public.dr_towns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  hotel_count INTEGER DEFAULT 0,
  is_tourist_zone BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Target keywords for SEO
CREATE TABLE public.seo_keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  town_id UUID REFERENCES public.dr_towns(id) ON DELETE SET NULL,
  search_volume INTEGER DEFAULT 0,
  difficulty INTEGER DEFAULT 0,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_description TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  town_id UUID REFERENCES public.dr_towns(id) ON DELETE SET NULL,
  primary_keyword TEXT,
  secondary_keywords TEXT[],
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_indexed BOOLEAN DEFAULT false,
  indexed_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  schema_markup JSONB,
  word_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: SEO metrics tracking
CREATE TABLE public.seo_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  avg_position DECIMAL(5,2),
  ctr DECIMAL(5,4),
  recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Indexing requests log
CREATE TABLE public.indexing_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'indexed', 'failed')),
  response_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: Citations / backlinks tracking
CREATE TABLE public.citations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  source_name TEXT NOT NULL,
  source_url TEXT,
  citation_type TEXT DEFAULT 'directory' CHECK (citation_type IN ('directory', 'social', 'forum', 'guest_post', 'press')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'verified')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.dr_towns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indexing_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citations ENABLE ROW LEVEL SECURITY;

-- Public read for published blog posts
CREATE POLICY "Published blog posts are publicly readable"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

-- Public read for towns
CREATE POLICY "Towns are publicly readable"
  ON public.dr_towns FOR SELECT
  USING (true);

-- Service role policies for edge functions
CREATE POLICY "Service role can manage blog posts"
  ON public.blog_posts FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage keywords"
  ON public.seo_keywords FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage towns"
  ON public.dr_towns FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage metrics"
  ON public.seo_metrics FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage indexing log"
  ON public.indexing_log FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage citations"
  ON public.citations FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_town ON public.blog_posts(town_id);
CREATE INDEX idx_seo_keywords_town ON public.seo_keywords(town_id);
CREATE INDEX idx_seo_metrics_post ON public.seo_metrics(blog_post_id);
CREATE INDEX idx_seo_metrics_date ON public.seo_metrics(recorded_date);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
