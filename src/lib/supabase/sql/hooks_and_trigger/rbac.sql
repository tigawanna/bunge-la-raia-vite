-- Create the auth hook function
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Fetch the user role in the user_roles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;



GRANT USAGE ON SCHEMA public TO supabase_auth_admin;

GRANT
EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;

REVOKE
EXECUTE ON FUNCTION public.custom_access_token_hook
FROM authenticated, anon, public;

GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin;

REVOKE ALL ON
TABLE public.user_roles
FROM authenticated, anon, public;

CREATE policy "Allow auth admin to read user roles" ON public.user_roles AS permissive FOR
SELECT TO supabase_auth_admin USING (TRUE)
