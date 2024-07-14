-- list tables columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'users';


-- list all triggers
SELECT
    event_object_table AS table_name,
    trigger_name
FROM information_schema.triggers


-- disable the trigger
ALTER TABLE auth.users DISABLE TRIGGER create_public_user_trigger;


-- enable the trigger
ALTER TABLE auth.users ENABLE TRIGGER create_public_user_trigger;


-- delte the trigger
DROP TRIGGER create_public_user_trigger ON auth.users;


-- inspect auth metadata
SELECT jsonb_each (raw_user_meta_data) FROM auth.users
