
-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Schedule: generate blog + index every 6 hours
SELECT cron.schedule(
  'seo-automation-cycle',
  '0 */6 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://wwhszmcsdrwifvyhpnjw.supabase.co/functions/v1/seo-cron',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHN6bWNzZHJ3aWZ2eWhwbmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODM4ODcsImV4cCI6MjA4ODU1OTg4N30.yGLQ-nxPxu5Ut1frvX3QV0MWOB8NNZ-p8ZMvsPdT_D0"}'::jsonb,
        body:='{"action": "generate_and_index"}'::jsonb
    ) as request_id;
  $$
);
