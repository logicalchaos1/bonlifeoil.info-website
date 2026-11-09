# Facebook lead ads + SMS/voice qualifier

Low-cost Facebook/Instagram lead campaigns for Bonlife Oil. Each lead is
qualified automatically by SMS, or by an ElevenLabs voice call if they don't
reply, then handed to a person with a clear next step.

```
FB/IG ad ─▶ instant form ─▶ /fb-lead ─▶ leads + lead_qualifications ─▶ SMS #1
                                                            │
             reply by SMS ─▶ /sms ──────────────────────────┤
     no reply in 1h ─▶ /followup ─▶ ElevenLabs call ─▶ /voice
                                                            │
                         ready / needs_human ─▶ email to the team with WhatsApp + call links
daily ─▶ /optimizer: pause losers, scale winners, total ≤ $10/day
```

Everything is configured in `supabase/functions/_shared/campaigns.json`:
campaigns, ad copy, form questions, SMS questions, goals and budget rules.

## Campaigns

| Key | Offer | Goal handed to a person |
|---|---|---|
| `muestra-freir` | Free sample of frying oil (restaurants, fritureras) | Deliver sample at confirmed address and time |
| `palma-25l` | Palm oil 25L, RD$4,600, volume pricing | Quote call at confirmed time |
| `piloto-hoteles` | 15-day pilot with savings report (hotels) | Technical visit at confirmed time |
| `panaderias` | Shortening and margarine (bakeries) | Quote call at confirmed time |

Each campaign has one ad set for the Dominican Republic at $2/day and two ads
(A/B images in `marketing/fb/creatives/`). That's $8/day to start.

## Budget rules (`/optimizer`, daily 06:20 Santo Domingo)

- Nothing is touched in its first 48 hours (Meta's learning phase).
- An ad or ad set is paused after spending 2× its target cost per lead with no
  leads, or once it has spent 3× target at more than 2.5× target per lead.
- At least one ad per ad set and one ad set overall always stay on.
- Winners (2+ leads in the last 3 days at or under target) get +30% budget, up to $4/day.
- Ad sets above target get −30%, down to $1/day.
- The total of all running ad sets never goes above $10/day.

It runs as a **dry run** until `FB_OPTIMIZER_APPLY=true`. Each run is saved to
`fb_optimizer_log`, so check a few days of decisions before turning it on.

## Lead statuses (`lead_qualifications.status`)

- `texting`: SMS conversation in progress.
- `ready`: interest confirmed and every question answered. The team gets an email with the next step.
- `needs_human`: unclear answers, a voicemail, or no reply for 20 hours. The team gets an email.
- `not_interested` / `opted_out`: no further contact.
- `done`: set by a person when the lead has been handled.

## Setup

### 1. Accounts

- **Meta**: a Business Manager with the Bonlife Page and an ad account, plus a
  system user token with `ads_management`, `leads_retrieval`,
  `pages_manage_ads`, `pages_read_engagement` and `pages_manage_metadata`.
  You also need a Meta app (for the lead webhook).
- **Twilio**: a phone number that can send SMS to the Dominican Republic.
- **ElevenLabs**: Conversational AI, with the Twilio number imported under
  *Phone Numbers* (that gives you the phone number id).
- **Resend**: already used by `notify-lead`.

### 2. Supabase (project `zabbeoqmhoomxgtagvaz`)

Already done: the tables, the schedules, the `bonlife-automation` function
(routes `/fb-lead`, `/sms`, `/voice`, `/followup`, `/optimizer`, `/seo-report`)
and the Vault secrets `bonlife_cron_secret` and `bonlife_gsc_service_account`.
What's left is adding these function secrets as each service is connected:

| Secret | Value |
|---|---|
| `META_APP_SECRET` | Meta app secret |
| `META_VERIFY_TOKEN` | any random string (reused in step 5) |
| `META_PAGE_TOKEN` | Page token with `leads_retrieval` |
| `META_ACCESS_TOKEN` | system user token (optimizer) |
| `META_AD_ACCOUNT_ID` | ad account id |
| `META_CURRENCY_PER_USD` | e.g. `61` if the ad account is in DOP; skip for USD |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` | Twilio |
| `SMS_WEBHOOK_URL` | `https://zabbeoqmhoomxgtagvaz.supabase.co/functions/v1/bonlife-automation/sms` |
| `ELEVENLABS_API_KEY`, `ELEVENLABS_AGENT_ID`, `ELEVENLABS_PHONE_NUMBER_ID`, `ELEVENLABS_WEBHOOK_SECRET` | ElevenLabs |
| `NOTIFY_TO` | optional, defaults to jeffrey@bonlifeoil.info |
| `FB_OPTIMIZER_APPLY` | leave unset for the first week, then `true` |

Until the Meta keys are set, `/optimizer` reports "Meta credentials not set" and does nothing.

## Weekly SEO report

`/seo-report` emails a Search Console summary every Monday at 08:43 Santo Domingo
time: clicks and impressions against the previous week, non-brand searches, top
pages, whether the key pages are indexed, sitemap status and site leads.

### 3. Twilio

Set the number's *A message comes in* webhook to the `SMS_WEBHOOK_URL` above (HTTP POST).

### 4. ElevenLabs

```sh
ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=<Spanish voice> node marketing/voice/agent.mjs
```

Put the printed agent id in `ELEVENLABS_AGENT_ID`. Under *Settings → Webhooks*, add a
post-call webhook to `.../functions/v1/bonlife-automation/voice` and copy its secret
into `ELEVENLABS_WEBHOOK_SECRET`. Calls only go out Monday–Saturday, 9:00–18:00.

### 5. Facebook

```sh
export META_ACCESS_TOKEN=... META_AD_ACCOUNT_ID=... META_PAGE_ID=...
node marketing/fb/import.mjs                     # print the plan
node marketing/fb/import.mjs --create            # build everything paused
# review in Ads Manager, then:
node marketing/fb/import.mjs --create --activate

META_APP_ID=... META_APP_SECRET=... META_VERIFY_TOKEN=... \
LEAD_WEBHOOK_URL=https://zabbeoqmhoomxgtagvaz.supabase.co/functions/v1/bonlife-automation/fb-lead \
node marketing/fb/import.mjs --subscribe-webhook
```

Use Meta's *Lead Ads Testing Tool* to send a test lead and confirm it arrives
in `lead_qualifications` and that the SMS goes out.

## Editing

- Change copy, questions, budgets or targets in `campaigns.json`. New campaigns
  need a design entry in `marketing/fb/render-creatives.mjs`.
- Re-render images: `node marketing/fb/render-creatives.mjs`
- Tests: `node --test --experimental-strip-types supabase/functions/_shared/*.test.ts`
