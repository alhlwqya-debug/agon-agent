-- AppVault database schema
create table if not exists public.categories (
  id serial primary key,
  name text not null,
  slug text not null unique,
  icon text default 'tag',
  color text default '#7c3aed',
  created_at timestamptz not null default now()
);

create table if not exists public.apps (
  id serial primary key,
  slug text not null unique,
  name text not null,
  developer text not null,
  short_description text not null,
  description text default '',
  category_id integer references public.categories(id) on delete set null,
  version text default '1.0.0',
  size_mb numeric(10,2) default 0,
  icon_url text default '',
  screenshots text default '[]',
  download_url text default '',
  download_count integer default 0,
  rating numeric(3,2) default 0,
  reviews_count integer default 0,
  system_requirements text default '',
  tags text default '[]',
  changelog text default '',
  is_featured boolean default false,
  is_hidden boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists apps_slug_idx on public.apps (slug);
create index if not exists apps_category_idx on public.apps (category_id);
create index if not exists apps_is_hidden_idx on public.apps (is_hidden);
create index if not exists apps_is_featured on public.apps (is_featured);

create table if not exists public.reviews (
  id serial primary key,
  app_id integer not null references public.apps(id) on delete cascade,
  user_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

create index if not exists reviews_app_id_idx on public.reviews (app_id);

alter table public.categories enable row level security;
alter table public.apps enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "categories_read_all" on public.categories;
create policy "categories_read_all" on public.categories for select using (true);
drop policy if exists "apps_read_visible" on public.apps;
create policy "apps_read_visible" on public.apps for select using (is_hidden = false);
drop policy if exists "reviews_read_all" on public.reviews;
create policy "reviews_read_all" on public.reviews for select using (true);
drop policy if exists "reviews_insert_anyone" on public.reviews;
create policy "reviews_insert_anyone" on public.reviews for insert with check (true);

insert into public.categories (name, slug, icon, color) values
  ('Productivity', 'productivity', 'briefcase', '#7c3aed'),
  ('Games', 'games', 'gamepad-2', '#ec4899'),
  ('Developer', 'developer', 'terminal', '#0ea5e9'),
  ('Media', 'media', 'play', '#f59e0b'),
  ('Utilities', 'utilities', 'wrench', '#10b981'),
  ('Education', 'education', 'graduation-cap', '#6366f1')
on conflict (slug) do nothing;
