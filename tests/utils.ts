import { execSync } from "child_process";
import detectPort from "detect-port";

export async function setupE2eTest() {
  console.log("starting E2e test");
  await startSupabase();
  reseedDb();
}
async function startSupabase() {
  console.log("Detecting port..");
  const port = await detectPort(54321);
  if (port !== 54321) {
    console.log("port confirmation failed")
    return;
  }

  console.warn("Supabase not detected - Starting it now");
  execSync("pnpm supabase start");
}

function reseedDb() {
  execSync(
    "PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -p 54322 -f supabase/clear-db-data.sql",
    { stdio: "ignore" }
  );
}
