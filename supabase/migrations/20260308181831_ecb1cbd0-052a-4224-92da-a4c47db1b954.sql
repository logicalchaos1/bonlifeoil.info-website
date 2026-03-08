
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  company text,
  business_type text,
  monthly_consumption text,
  message text,
  source text NOT NULL DEFAULT 'contact_form',
  referral_code text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Service role can manage leads" ON public.leads
  FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_name text NOT NULL,
  referrer_company text NOT NULL,
  referrer_email text NOT NULL,
  referrer_phone text,
  referral_code text UNIQUE NOT NULL,
  referral_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert referrals" ON public.referrals
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can read referrals by code" ON public.referrals
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Service role can manage referrals" ON public.referrals
  FOR ALL USING (true) WITH CHECK (true);
