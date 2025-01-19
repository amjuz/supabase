alter table "public"."post" drop constraint "post_post_id_fkey";

alter table "public"."post" add constraint "post_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id) not valid;

alter table "public"."post" validate constraint "post_user_id_fkey";


