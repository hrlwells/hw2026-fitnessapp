-- Run this once in your Supabase SQL editor (supabase.com > your project > SQL Editor)

-- Create the team_stats table
create table if not exists team_stats (
  team        text primary key,
  pts         integer default 0,
  gf          integer default 0,
  ga          integer default 0,
  gd          integer default 0,
  round       text default 'Group Stage',
  fixtures    jsonb default '[]',
  updated_at  timestamptz default now()
);

-- Allow public read access (the frontend reads this without auth)
alter table team_stats enable row level security;

create policy "Allow public read"
  on team_stats for select
  using (true);

-- The update script uses the service role key which bypasses RLS for writes
-- No insert/update policy needed for the anon key

-- Optional: seed with all 48 teams at Group Stage so the app works before Claude runs
insert into team_stats (team) values
  ('Spain'),('Canada'),('Iran'),('Brazil'),('Ecuador'),('Cape Verde'),
  ('Mexico'),('Ivory Coast'),('Jordan'),('Belgium'),('Türkiye'),('New Zealand'),
  ('USA'),('Egypt'),('Iraq'),('Colombia'),('Algeria'),('Qatar'),
  ('Germany'),('Croatia'),('Saudi Arabia'),('Japan'),('Czechia'),('DR Congo'),
  ('France'),('Sweden'),('Curacao'),('England'),('South Korea'),('South Africa'),
  ('Norway'),('Austria'),('Haiti'),('Netherlands'),('Senegal'),('Uzbekistan'),
  ('Argentina'),('Uruguay'),('Scotland'),('Morocco'),('Paraguay'),('Tunisia'),
  ('Portugal'),('Bosnia & Herzegovina'),('Panama'),('Switzerland'),('Ghana'),('Australia')
on conflict (team) do nothing;
