-- select rules
create policy "allow all to select" on "public"."governors" to public using (true);
create policy "allow all to select" on "public"."counties" to public using (true);
create policy "allow all to select" on "public"."mps" to public using (true);
create policy "allow all to select" on "public"."constituencies" to public using (true);
create policy "allow all to select" on "public"."mcas" to public using (true);
create policy "allow all to select" on "public"."wards" to public using (true);
create policy "allow all to select" on "public"."candidates" to public using (true);
create policy "allow all to select" on "public"."candidate_aspirations" to public using (true);


--  insert rules
CREATE policy "Enable insert for authenticated users only"
on "public"."governors" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

CREATE policy "Enable insert for authenticated users only"
on "public"."counties" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

CREATE policy "Enable insert for authenticated users only"
on "public"."mps" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

CREATE policy "Enable insert for authenticated users only"
on "public"."constituencies" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

CREATE policy "Enable insert for authenticated users only"
on "public"."mcas" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

CREATE policy "Enable insert for authenticated users only"
on "public"."wards" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

CREATE policy "Enable insert for authenticated users only"
on "public"."candidates" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

CREATE policy "Enable insert for authenticated users only"
on "public"."candidate_aspirations" AS PERMISSIVE FOR INSERT
TO authenticated with check ( true);

-- update rules for candidates where user_id = id
CREATE policy "Enable update for candidate based on user_id"
on "public"."candidates" AS PERMISSIVE FOR UPDATE
TO public using ( ( SELECT auth.uid () ) = id);


-- update rules
CREATE policy "Allow authorized update access to admins" ON public.governors FOR UPDATE USING ((SELECT authorize ('common.update')));
CREATE policy "Allow authorized update access to admins" ON public.counties FOR UPDATE USING ((SELECT authorize ('common.update')));
CREATE policy "Allow authorized update access to admins" ON public.mps FOR UPDATE USING ((SELECT authorize ('common.update')));
CREATE policy "Allow authorized update access to admins" ON public.constituencies FOR UPDATE USING ((SELECT authorize ('common.update')));
CREATE policy "Allow authorized update access to admins" ON public.mcas FOR UPDATE USING ((SELECT authorize ('common.update')));
CREATE policy "Allow authorized update access to admins" ON public.wards FOR UPDATE USING ((SELECT authorize ('common.update')));
CREATE policy "Allow authorized update access to admins" ON public.candidates FOR UPDATE USING ((SELECT authorize ('common.update')));
CREATE policy "Allow authorized update access to admins" ON public.candidate_aspirations FOR UPDATE USING ((SELECT authorize ('common.update')));
 
-- delete rules

CREATE policy "Allow authorized delete access to admins" ON public.governors FOR DELETE USING ((SELECT authorize ('common.delete')));
CREATE policy "Allow authorized delete access to admins" ON public.counties FOR DELETE USING ((SELECT authorize ('common.delete')));
CREATE policy "Allow authorized delete access to admins" ON public.mps FOR DELETE USING ((SELECT authorize ('common.delete')));
CREATE policy "Allow authorized delete access to admins" ON public.constituencies FOR DELETE USING ((SELECT authorize ('common.delete')));
CREATE policy "Allow authorized delete access to admins" ON public.mcas FOR DELETE USING ((SELECT authorize ('common.delete')));
CREATE policy "Allow authorized delete access to admins" ON public.wards FOR DELETE USING ((SELECT authorize ('common.delete')));
CREATE policy "Allow authorized delete access to admins" ON public.candidates FOR DELETE USING ((SELECT authorize ('common.delete')));
CREATE policy "Allow authorized delete access to admins" ON public.candidate_aspirations FOR DELETE USING ((SELECT authorize ('common.delete')));
