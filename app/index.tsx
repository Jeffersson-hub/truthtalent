/* import Dashboard from "@/app/dashboard/page";

export default function HomePage() {
  return <Dashboard />;
} */

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/dashboard");
}
