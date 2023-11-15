# nextjs-supabase-blog
NextJS

Generate Types Supabase 

npx supabase gen types typescript --project-id "ksiybdpmwdqcrvzekscu" --schema public > types/supabase.ts

Policy
(requesting_user_id() = user_id)


create trigger handle_profiles_updated_at before update on profiles
  for each row execute procedure moddatetime (updated_at);


yarn playwright install