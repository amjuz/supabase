import { Database } from "@/types/database.types";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
export const supabase = createClient();
