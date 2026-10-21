-- Giveaway store. Nothing here is writable from the browser: row level security is on and there are
-- no policies, so only the `giveaway` edge function (service role) can write. The two views below
-- are the public, read-only audit trail.

create table if not exists public.giveaway_users (
  giveaway_id       text not null,
  login             text not null,
  clerk_user_id     text not null,
  github_created_at timestamptz,
  referred_by       text,
  last_synced_at    timestamptz,
  created_at        timestamptz not null default now(),
  primary key (giveaway_id, login)
);

create table if not exists public.giveaway_entries (
  id          bigint generated always as identity primary key,
  giveaway_id text not null,
  login       text not null,
  kind        text not null check (kind in ('star', 'follow', 'pr', 'referral', 'bonus')),
  -- pr: the pull request URL. referral: the friend's login. Others: empty.
  ref         text not null default '',
  entries     integer not null check (entries >= 0),
  created_at  timestamptz not null default now(),
  unique (giveaway_id, login, kind, ref)
);

-- A friend can only be credited to one referrer.
create unique index if not exists giveaway_one_referrer_per_friend
  on public.giveaway_entries (giveaway_id, ref) where kind = 'referral';

alter table public.giveaway_users enable row level security;
alter table public.giveaway_entries enable row level security;
revoke all on public.giveaway_users from anon, authenticated;
revoke all on public.giveaway_entries from anon, authenticated;

-- Public ledger: every entry that was awarded and why. GitHub handles only.
create or replace view public.giveaway_ledger as
  select giveaway_id, login, kind, ref, entries, created_at
  from public.giveaway_entries;

-- Public totals per person. This is the file the draw script reads.
create or replace view public.giveaway_totals as
  select giveaway_id, login, sum(entries)::integer as entries
  from public.giveaway_entries
  group by giveaway_id, login;

grant select on public.giveaway_ledger, public.giveaway_totals to anon, authenticated;
