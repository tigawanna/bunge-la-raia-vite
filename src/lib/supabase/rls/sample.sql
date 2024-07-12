--  available methods SELECT, UPDATE, DELETE, INSERT OR ALL

-- only allow action for any user
CREATE policy "Enable for everyone"
on "public"."admin"
AS PERMISSIVE
FOR SELECT -- or UPDATE , DELETE, INSERT or ALL
TO public
using (TRUE);

-- enable for authenticated users
CREATE policy "enable for authenticated users"
on "public"."admin"
AS PERMISSIVE
FOR SELECT -- or UPDATE , DELETE, INSERT or ALL
to authenticated
with check (true);

-- only allow update for users based on email
create policy "Enable action for users based on email"
on "public"."admin" AS PERMISSIVE
FOR SELECT -- or UPDATE , DELETE, INSERT or ALL
using (
  (select auth.jwt()) ->> 'email' = email
) with check (
  (select auth.jwt()) ->> 'email' = email
);

-- only allow action if user_id matches authenticated user.id
CREATE policy "Enable action if user_id matches authenticated user.id"
on "public"."admin"
AS PERMISSIVE
FOR SELECT -- or UPDATE , DELETE, INSERT or ALL
TO public
USING ( 
    ( SELECT auth.uid () ) = user_id )


-- authorize using joins on another table
-- this policy is to be used to lock down actions to only user_ids in the admin table
CREATE policy "Members can do actions if they belong to the admin" 
ON teams FOR on "public"."admin"
AS PERMISSIVE
FOR SELECT -- or UPDATE , DELETE, INSERT or ALL
TO PUBLIC
USING (
    ( SELECT auth.uid ()) IN (SELECT user_id FROM "admin" WHERE user_id = id)
);

SELECT EXISTS (
        SELECT 1
        FROM admin
        WHERE
            user_id = auth.uid ()
    );

--   (select auth.uid()) in (select user_id from admin where team_id = id)

-- --  based on joins on other tables
-- CREATE policy "Policy for writing to readonly tables (mps,conties,constituencies,wards)" on "public"."admin" AS PERMISSIVE
-- FOR UPDATE
-- TO public
-- using ( (SELECT auth.uid ()) IN (SELECT user_id FROM "admin" WHERE "user_id" = id));

--  using postgres functions
CREATE policy "Policy with security definer functions"
on "public"."admin" 
AS PERMISSIVE
FOR ALL
TO public
using (team_id IN ( SELECT get_teams_for_user (auth.uid ()) ));
