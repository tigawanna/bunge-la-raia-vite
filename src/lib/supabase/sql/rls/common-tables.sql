-- select rules
create policy "allow all to select" on "public"."governors" to public using (true);
create policy "allow all to select" on "public"."counties" to public using (true);
create policy "allow all to select" on "public"."mps" to public using (true);
create policy "allow all to select" on "public"."constituencies" to public using (true);
create policy "allow all to select" on "public"."mcas" to public using (true);
create policy "allow all to select" on "public"."wards" to public using (true);


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
 

-- update rules 
CREATE policy "Allow authorized delete access" ON public.mps FOR DELETE USING (
    (
        SELECT authorize ('common.delete')
    )
);

CREATE policy "Allow authorized delete access" ON public.messages FOR DELETE USING (
    (
        SELECT authorize ('common.delete')
    )
);
