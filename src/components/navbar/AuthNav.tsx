import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "./Navbar";

export async function AuthNav() {
  const user = await getCurrentUser();
  return <Navbar user={user} />;
}
