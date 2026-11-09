-- Weekly Search Console report for bonlifeoil.info, plus a service-role-only
-- reader for the Vault secrets the Bonlife functions use.
-- Secrets (created once, outside migrations):
--   select vault.create_secret(encode(extensions.gen_random_bytes(24), 'hex'), 'bonlife_cron_secret');
--   select vault.create_secret('<service account JSON>', 'bonlife_gsc_service_account');

CREATE OR REPLACE FUNCTION public.get_bonlife_secret(p_name TEXT)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT decrypted_secret FROM vault.decrypted_secrets
  WHERE name = p_name AND name IN ('bonlife_cron_secret', 'bonlife_gsc_service_account')
  LIMIT 1;
$$;
REVOKE ALL ON FUNCTION public.get_bonlife_secret(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_bonlife_secret(TEXT) TO service_role;

DO $$
BEGIN
  PERFORM cron.unschedule('bonlife-seo-weekly-report');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Mondays 12:43 UTC = 08:43 in Santo Domingo.
SELECT cron.schedule(
  'bonlife-seo-weekly-report',
  '43 12 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://zabbeoqmhoomxgtagvaz.supabase.co/functions/v1/seo-weekly-report',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'bonlife_cron_secret' LIMIT 1)
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 60000
  );
  $$
);
