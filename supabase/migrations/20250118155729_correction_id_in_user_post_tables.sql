create type "public"."post_status" as enum ('published', 'draft');

drop policy "Allow authenticated uploads" on "public"."post";

drop policy "select all users" on "public"."post";

drop policy "Users can create a profile" on "public"."users";

alter table "public"."post" drop constraint "post_author_id_fkey";

alter table "public"."users" drop constraint "user_id_fkey";

alter table "public"."users" drop constraint "user_pkey";

alter table "public"."post" drop constraint "post_pkey";

drop index if exists "public"."user_pkey";

drop index if exists "public"."post_pkey";

alter table "public"."post" drop column "author_id";

alter table "public"."post" drop column "id";

alter table "public"."post" add column "post_id" uuid not null default gen_random_uuid();

alter table "public"."post" add column "slug" character varying not null;

alter table "public"."post" add column "status" post_status not null;

alter table "public"."post" add column "user_id" uuid not null;

alter table "public"."users" drop column "id";

alter table "public"."users" add column "user_id" uuid not null default auth.uid();

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (user_id);

CREATE UNIQUE INDEX post_pkey ON public.post USING btree (post_id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."post" add constraint "post_pkey" PRIMARY KEY using index "post_pkey";

alter table "public"."post" add constraint "post_post_id_fkey" FOREIGN KEY (post_id) REFERENCES users(user_id) not valid;

alter table "public"."post" validate constraint "post_post_id_fkey";

alter table "public"."users" add constraint "users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_user_id_fkey";

create policy "Allow authenticated uploads"
on "public"."post"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "select all users"
on "public"."post"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Users can create a profile"
on "public"."users"
as permissive
for insert
to public
with check ((auth.uid() = user_id));



