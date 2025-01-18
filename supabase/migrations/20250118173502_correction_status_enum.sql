alter type "public"."post_status" rename to "post_status__old_version_to_be_dropped";

create type "public"."post_status" as enum ('publish', 'draft');

alter table "public"."post" alter column status type "public"."post_status" using status::text::"public"."post_status";

drop type "public"."post_status__old_version_to_be_dropped";


