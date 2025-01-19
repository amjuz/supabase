"use client";

import SelectBoxPostStatus from "@/components/select-box-post-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase/client";

const status = ["draft", "publish"] as const;
export type TStatus = ["draft", "publish"];
const CreateBlogFormSchema = z.object({
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  status: z.enum(status),
});

export type TCreateBlogFormSchema = z.infer<typeof CreateBlogFormSchema>;

export default function CreateBlog() {
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TCreateBlogFormSchema>({
    resolver: zodResolver(CreateBlogFormSchema),
    defaultValues: {
      status: "publish",
    },
  });

  async function onSubmit() {
    try {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
      
      if (!userId) {
        toast.error("something went wrong, failed to retrieve user id");
        return;
      }
      const { error } = await supabase.from("post").insert({
        content: getValues("content"),
        title: getValues("title"),
        slug: getValues("slug"),
        status: getValues("status"),
        user_id: userId,
      });

      if (error) {
        toast.error("Something went wrong, couldn't create blog");
        return;
      }
      toast.success("blog added");
      console.log("blog added");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold w-full text-center my-8">
        Create New blog
      </h2>
      <div className="flex flex-col gap-3 px-2">
        <Input
          {...register("title")}
          name="title"
          placeholder="Title"
          required
        />
        {errors && errors.title?.message}
        <textarea
          {...register("content")}
          name="content"
          className="h-40 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Content"
          required
        />
        {errors && errors.content?.message}
        <Input
          required
          placeholder="Enter a small title for SEO"
          {...register("slug")}
        />
        {errors && errors.slug?.message}
        <SelectBoxPostStatus
          watch={watch}
          register={register}
          setValue={setValue}
        />
        {errors && errors.status?.message}
        <div className="flex justify-end ">
          <Button>Create</Button>
        </div>
      </div>
    </form>
  );
}
