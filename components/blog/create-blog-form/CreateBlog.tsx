"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IBlogInputForm {
  title: string;
  content: string;
}
export default function CreateBlog() {
  const { handleSubmit, register, getValues } = useForm<IBlogInputForm>();
  async function onSubmit() {
    const userId = await (await supabase.auth.getUser()).data.user?.id;
    if (!userId) {
      toast("user id invalid");
      return;
    }

    try {
      const createBlog = await supabase.from("post").insert({
        content: getValues("content"),
        titile: getValues("title"),
        author_id: userId,
      }).select()

      console.log("res->", createBlog.data);

      const { count, data, error, status, statusText } = createBlog;
      
      if (error) {
        toast.error("couldnt create blog");
      }
      toast.success("blog added");

      console.log("blog added");
    } catch (error) {
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
        <textarea
          {...register("content")}
          name="content"
          className="h-40 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Content"
          required
        />
        <div className="flex justify-end ">
          <Button>Create</Button>
        </div>
      </div>
    </form>
  );
}
