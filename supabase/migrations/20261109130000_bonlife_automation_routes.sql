-- The six Bonlife functions were merged into one, bonlife-automation, because
-- the project hit its edge function limit. Point the schedules at its routes.

CREATE OR REPLACE FUNCTION pg_temp.bonlife_schedule(job TEXT, cron_expr TEXT, route TEXT) RETURNS VOID
LANGUAGE plpgsql AS $fn$
BEGIN
  BEGIN
    PERFORM cron.unschedule(job);
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  PERFORM cron.schedule(job, cron_expr, format($job$
    SELECT net.http_post(
      url := 'https://zabbeoqmhoomxgtagvaz.supabase.co/functions/v1/bonlife-automation/%s',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'bonlife_cron_secret' LIMIT 1)
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 60000
    );
  $job$, route));
END;
$fn$;

-- Hourly: voice calls to leads who didn't answer the SMS, handoff of stalled leads.
SELECT pg_temp.bonlife_schedule('bonlife-qualifier-followup', '7 * * * *', 'followup');
-- Daily 06:20 Santo Domingo: Facebook budget rules.
SELECT pg_temp.bonlife_schedule('bonlife-fb-optimizer', '20 10 * * *', 'optimizer');
-- Mondays 08:43 Santo Domingo: Search Console email.
SELECT pg_temp.bonlife_schedule('bonlife-seo-weekly-report', '43 12 * * 1', 'seo-report');
