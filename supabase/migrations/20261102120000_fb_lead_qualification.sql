-- Facebook lead ads: SMS/voice qualification state, message log, optimizer log,
-- and the schedules that drive follow-ups and budget optimization.
-- Before the schedules can run, store the shared cron secret in Vault:
--   select vault.create_secret('<random string>', 'bonlife_cron_secret');
-- and set the same value as the CRON_SECRET function secret.

CREATE TABLE IF NOT EXISTS public.lead_qualifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fb_lead_id TEXT UNIQUE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  campaign_key TEXT NOT NULL,
  fb_ad_id TEXT,
  fb_adset_id TEXT,
  name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'texting'
    CHECK (status IN ('texting', 'ready', 'not_interested', 'opted_out', 'needs_human', 'done')),
  step TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  retries INTEGER NOT NULL DEFAULT 0,
  call_attempts INTEGER NOT NULL DEFAULT 0,
  last_outbound_at TIMESTAMPTZ,
  last_inbound_at TIMESTAMPTZ,
  handed_off_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lead_qualifications_phone ON public.lead_qualifications(phone, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_qualifications_status ON public.lead_qualifications(status);

CREATE TABLE IF NOT EXISTS public.qualification_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qualification_id UUID NOT NULL REFERENCES public.lead_qualifications(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('in', 'out')),
  channel TEXT NOT NULL CHECK (channel IN ('sms', 'voice')),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_qualification_messages_q ON public.qualification_messages(qualification_id, created_at);

CREATE TABLE IF NOT EXISTS public.fb_optimizer_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ran_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  applied BOOLEAN NOT NULL,
  adsets INTEGER NOT NULL DEFAULT 0,
  actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  errors JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Lead data is private: only the edge functions (service role) touch these tables.
ALTER TABLE public.lead_qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualification_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fb_optimizer_log ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_lead_qualifications_updated_at ON public.lead_qualifications;
CREATE TRIGGER update_lead_qualifications_updated_at
  BEFORE UPDATE ON public.lead_qualifications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Schedules (UTC). Santo Domingo is UTC-4.
DO $$
BEGIN
  PERFORM cron.unschedule('bonlife-qualifier-followup');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  PERFORM cron.unschedule('bonlife-fb-optimizer');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'bonlife-qualifier-followup',
  '7 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://zabbeoqmhoomxgtagvaz.supabase.co/functions/v1/qualifier-followup',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'bonlife_cron_secret' LIMIT 1)
    ),
    body := '{}'::jsonb
  );
  $$
);

-- 06:20 in Santo Domingo, after Meta has settled the previous day's numbers.
SELECT cron.schedule(
  'bonlife-fb-optimizer',
  '20 10 * * *',
  $$
  SELECT net.http_post(
    url := 'https://zabbeoqmhoomxgtagvaz.supabase.co/functions/v1/fb-optimizer',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'bonlife_cron_secret' LIMIT 1)
    ),
    body := '{}'::jsonb
  );
  $$
);
