-- postgrese functio that ctreate a public user from auth.user
CREATE
OR REPLACE FUNCTION public.create_public_user() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO public.users (id,username,fullname,avatar_url,email)
VALUES
  (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'name',
    NEW.raw_user_meta_data ->> 'avatar_url',
    NEW.raw_user_meta_data ->> 'email'

  );
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for create public user on auth insert
CREATE TRIGGER create_public_user_trigger AFTER
INSERT
    ON auth.users FOR EACH ROW WHEN (
        NEW.raw_user_meta_data IS NOT NULL
    )
EXECUTE FUNCTION public.create_public_user ();






