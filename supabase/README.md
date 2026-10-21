# Giveaway backend

Entries are verified on the server with GitHub and stored in Supabase. The browser cannot write them.

## One time setup

```
npm install -g supabase
supabase login
supabase link --project-ref <your project ref>
supabase secrets set CLERK_SECRET_KEY=<sk_live_...> GITHUB_TOKEN=<read-only github token>
supabase db push
supabase functions deploy giveaway --no-verify-jwt
```

`CLERK_SECRET_KEY` must be the production key (`sk_live_`) for recodehive.com. A `sk_test_` key only
accepts sign-ins from the Clerk development instance.

Then add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to `.env` and to the Vercel project, and redeploy.

## What is public

- `giveaway_ledger`: every awarded entry (GitHub handle, what for, when).
- `giveaway_totals`: entries per person. `scripts/draw-giveaway.ts` reads this shape directly:

```
curl "$SUPABASE_URL/rest/v1/giveaway_totals?giveaway_id=eq.halloween-2026&select=login,entries" \
  -H "apikey: $SUPABASE_ANON_KEY" > entrants.json
node scripts/draw-giveaway.ts entrants.json <seed>
```

The two tables behind them have row level security with no policies, so nothing else is readable or
writable from the browser.

## Rules enforced by the function

- Star (+2) and GitHub follow (+1) are checked with the GitHub API. Bonus (+5) needs both.
- Merged PRs (+10 each) must carry the `recode` label and be merged between Oct 21 00:00 and Nov 1
  23:59:59 Sydney time.
- Referral (+3, up to 5 friends): the friend's GitHub account must be at least 30 days old, must have a
  verified quest, and can only be credited to one referrer.
- Discord, LinkedIn, YouTube and X links earn nothing.
- Nothing is recorded outside the giveaway window.

Constants live at the top of `functions/giveaway/index.ts` and must match `src/data/giveaway.ts`.
