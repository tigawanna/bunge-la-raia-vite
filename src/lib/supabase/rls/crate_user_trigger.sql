-- Create the trigger function
CREATE FUNCTION public.handle_new_user_login() RETURNS trigger AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE user_id = NEW.id) THEN
    INSERT INTO public.users (user_id, name, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'email');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER on_auth_user_signed_in AFTER
INSERT
    ON auth.users FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user_login ();
