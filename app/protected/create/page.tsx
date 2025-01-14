import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function createBlog() {
// next task: complete the form and write an insert operation to db using supabase api
  return (
    <form>
      <h2 className="text-3xl font-bold w-full text-center my-8">
        Create New blog
      </h2>
      <div className="flex flex-col gap-3 px-2">
        <Input name="title" placeholder="Title" required />
        <textarea
          name="content"
          className="h-40 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Content"
          required
        />
        <div className="flex justify-end ">
          <Button
          //  onClick={handleSubmit}
          >Create</Button>
        </div>
      </div>
    </form>
  );
}
