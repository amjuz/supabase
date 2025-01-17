import { supabase } from "@/utils/supabase/server";

export default async function AllBlogs() {
  const res = await (await supabase).from("post").select("*");
  if (!res) console.log("failed to run query");
  if (res.error) console.log("failed to fetch blogs");

  return (
    <div className="space-y-2">
      {res.data?.map((item, i) => {
        return (
          <div className="border" key={i}>
            <h2 className="text-3xl font-bold text-muted-foreground">{item.titile}</h2>
            <p>{item.content}</p>
            <p>{item.author_id}</p>
          </div>
        );
      })}
    </div>
  );
}
