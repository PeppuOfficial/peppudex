-- ---------------------------------------------------------------------
-- peppudex_stacks · user-assembled compound stacks.
--
-- Persisted by POST /api/stacks/save (server route, uses service role).
-- Rendered by /stacks/built-<slug> (server component, also service role).
--
-- Dedup strategy: `set_hash` is a SHA-256 of the sorted compound
-- slug list. The API checks `set_hash` first and reuses the existing
-- row when found, so two stacks with the same components in any
-- order resolve to the same canonical page.
--
-- RLS · public read so /built-<slug> pages can render anonymously
-- via service role (and so future direct-from-browser reads also
-- work). All writes go through the service role from the API route,
-- which already bypasses RLS, so we keep the write policy minimal.
-- ---------------------------------------------------------------------

create table if not exists public.peppudex_stacks (
  id            bigserial primary key,
  slug          text        not null unique,
  compounds_json jsonb      not null,
  set_hash      text        not null unique,
  created_at    timestamptz not null default now(),
  view_count    integer     not null default 0
);

comment on table public.peppudex_stacks is
  'User-assembled peptide compound stacks · written by /api/stacks/save, read by /stacks/built-<slug>.';
comment on column public.peppudex_stacks.slug is
  'URL-safe canonical slug (token-tokens-hash). Unique.';
comment on column public.peppudex_stacks.compounds_json is
  'Ordered jsonb array of PEPPUDEX compound slugs (preserves display order).';
comment on column public.peppudex_stacks.set_hash is
  'sha256 of sorted compound slugs · used for order-independent dedup.';

create index if not exists peppudex_stacks_set_hash_idx
  on public.peppudex_stacks (set_hash);

create index if not exists peppudex_stacks_created_at_idx
  on public.peppudex_stacks (created_at desc);

-- RLS · enable + policies.
alter table public.peppudex_stacks enable row level security;

-- Public read: anyone can SELECT (anon + authenticated).
drop policy if exists peppudex_stacks_public_read
  on public.peppudex_stacks;
create policy peppudex_stacks_public_read
  on public.peppudex_stacks
  for select
  to anon, authenticated
  using (true);

-- No INSERT / UPDATE / DELETE policies for anon / authenticated.
-- Writes flow exclusively through the service-role API, which
-- bypasses RLS. This prevents drive-by spam while keeping the
-- table publicly readable.

-- Grants · explicit minimal surface.
grant select on public.peppudex_stacks to anon, authenticated;
grant usage, select on sequence public.peppudex_stacks_id_seq to anon, authenticated;
