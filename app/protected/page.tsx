import AllBlogs from "@/components/blog/all-blogs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="">
      <h2 className="w-full text-center py-4 text-4xl font-bold mt-2">
        DashBoard
      </h2>
      <div className="flex justify-center gap-3 my-8">
        <Link
          className={buttonVariants({ variant: "card" })}
          href={"/protected/create"}
        >
          Create blogs
        </Link>
        <Link className={buttonVariants({ variant: "card" })} href={"#"}>
          Read blogs
        </Link>
      </div>
      {/* <Suspense fallback={"loading"}> */}
        <AllBlogs />
      {/* </Suspense> */}
    </div>
  );
}
