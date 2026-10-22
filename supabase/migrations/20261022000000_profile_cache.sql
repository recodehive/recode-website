-- Cache for the public developer profile data fetched from GitHub. Written only by the `profile`
-- edge function (service role). Nothing here is readable or writable from the browser.

create table if not exists public.profile_cache (
  handle     text primary key,
  data       jsonb not null,
  fetched_at timestamptz not null default now()
);

alter table public.profile_cache enable row level security;
revoke all on public.profile_cache from anon, authenticated;
