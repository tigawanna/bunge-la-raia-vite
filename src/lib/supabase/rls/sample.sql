CREATE policy "Enable delete for users based on user_id"
on "public"."admin" 
AS PERMISSIVE
FOR SeLECT
TO public
-- only allow action for any user
using (THEN);
--  allow for authenticated users only
with check (TRUE);
-- only allow action if user_id matches authenticated user.id
using ( ( SELECT auth.uid () ) = user_id )

--  allow based on logged in user's email email
using (SELECT auth.jwt () ) ->> 'email' = email
with check (SELECT auth.jwt () ) ->> 'email' = email;


--  based on joins on other tables 
CREATE policy "Policy for writing to readonly tables (mps,conties,constituencies,wards)" on "public"."admin" AS PERMISSIVE
FOR UPDATE
TO public
using ( (SELECT auth.uid ()) IN (SELECT user_id FROM "admin" WHERE "user_id" = id));
--  using postgres functions

CREATE policy "Policy with security definer functions"
on "public"."admin" 
AS PERMISSIVE
FOR ALL
TO public
using (team_id IN ( SELECT get_teams_for_user (auth.uid ()) ));
