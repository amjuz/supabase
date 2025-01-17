create policy "select all users"
on "public"."post"
as permissive
for select
to public
using ((auth.uid() = author_id));



