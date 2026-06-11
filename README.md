# 🏆 FIFA World Cup 2026 — Wells & Mates Sweepstakes

Live sweepstakes tracker for 16 players. Updated automatically every day at **5pm AEST** by Claude.

---

## Deploy in 5 steps (~25 minutes total)

### Step 1 — Create your accounts (if you haven't already)

- [github.com](https://github.com) — free
- [supabase.com](https://supabase.com) — free
- [vercel.com](https://vercel.com) — free (sign up with GitHub)

You'll also need an Anthropic API key: [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key

---

### Step 2 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) → New Project (name it `wc2026`)
2. Once created, go to **SQL Editor** and paste the contents of `supabase-setup.sql`, then click **Run**
3. Go to **Settings → API** and copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon public** key
   - **service_role** key ⚠️ keep this secret — never commit it

---

### Step 3 — Push to GitHub

```bash
# In the project folder
git init
git add .
git commit -m "Initial commit"

# Create a new repo on github.com (call it wc2026-sweepstakes), then:
git remote add origin https://github.com/YOUR_USERNAME/wc2026-sweepstakes.git
git push -u origin main
```

---

### Step 4 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import your `wc2026-sweepstakes` GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. Before clicking Deploy, add these **Environment Variables**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | your Vercel URL (e.g. `https://wc2026-sweepstakes.vercel.app`) |

4. Click **Deploy** — Vercel gives you a public URL like `wc2026-sweepstakes.vercel.app`
5. **Optional:** Set up a Vercel Deploy Hook (Settings → Git → Deploy Hooks → Create) and copy the URL

---

### Step 5 — Add GitHub Secrets for the daily update

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**

Add these 3 secrets:

| Secret name | Value |
|-------------|-------|
| `ANTHROPIC_API_KEY` | your Anthropic API key |
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase **service_role** key |
| `VERCEL_DEPLOY_HOOK` | your Vercel deploy hook URL (optional but recommended) |

---

## How it works

Every day at **5pm AEST (07:00 UTC)**, GitHub Actions runs `scripts/update-stats.mjs` which:

1. Uses Claude + web search to fetch the latest World Cup 2026 results
2. Parses results for all 48 teams (points, goals, fixtures, round reached)
3. Writes the data to your Supabase database
4. Triggers a Vercel redeploy so the page serves fresh data immediately

Anyone with the Vercel URL can view the live dashboard — no login required.

---

## Manual update

If you want to trigger an update manually (e.g. right after a big match day):

```bash
# Locally (with .env.local set up)
npm run update

# Or via GitHub → Actions tab → Daily WC2026 Stats Update → Run workflow
```

---

## Local development

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key in .env.local

npm install
npm run dev
# Open http://localhost:3000
```

---

## Prize structure

| Prize | Amount | Criteria |
|-------|--------|----------|
| 🏆 Overall winner | $200 | Player whose Top team goes furthest |
| 🥈 Runner-up | $40 | Player whose Top team reaches the final |
| ⭐ Best regular team | $40 | Player whose Regular team goes furthest |
| 🌍 Best low ranked team | $40 | Player whose Low Ranked team goes furthest |

Tiebreaks: Stage reached → Real tournament points → Goal difference → Goals scored
