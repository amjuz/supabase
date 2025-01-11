create table "public"."post" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "author_id" uuid not null,
    "titile" character varying not null,
    "content" character varying not null
);


alter table "public"."post" enable row level security;

create table "public"."user" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "name" character varying
);


alter table "public"."user" enable row level security;

CREATE UNIQUE INDEX post_pkey ON public.post USING btree (id);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

alter table "public"."post" add constraint "post_pkey" PRIMARY KEY using index "post_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."post" add constraint "post_author_id_fkey" FOREIGN KEY (author_id) REFERENCES "user"(id) not valid;

alter table "public"."post" validate constraint "post_author_id_fkey";

alter table "public"."user" add constraint "user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."user" validate constraint "user_id_fkey";

grant delete on table "public"."post" to "anon";

grant insert on table "public"."post" to "anon";

grant references on table "public"."post" to "anon";

grant select on table "public"."post" to "anon";

grant trigger on table "public"."post" to "anon";

grant truncate on table "public"."post" to "anon";

grant update on table "public"."post" to "anon";

grant delete on table "public"."post" to "authenticated";

grant insert on table "public"."post" to "authenticated";

grant references on table "public"."post" to "authenticated";

grant select on table "public"."post" to "authenticated";

grant trigger on table "public"."post" to "authenticated";

grant truncate on table "public"."post" to "authenticated";

grant update on table "public"."post" to "authenticated";

grant delete on table "public"."post" to "service_role";

grant insert on table "public"."post" to "service_role";

grant references on table "public"."post" to "service_role";

grant select on table "public"."post" to "service_role";

grant trigger on table "public"."post" to "service_role";

grant truncate on table "public"."post" to "service_role";

grant update on table "public"."post" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";

create policy "Allow authenticated uploads"
on "public"."post"
as permissive
for insert
to public
with check ((auth.uid() = author_id));


create policy "Users can create a profile"
on "public"."user"
as permissive
for insert
to public
with check ((auth.uid() = id));



