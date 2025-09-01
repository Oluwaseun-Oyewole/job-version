import OAuth from "@/components/OAuth";
import { isServerTokenValid } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function Login() {
  if (await isServerTokenValid()) {
    redirect(routes.dashboard);
  }
  return <OAuth />;
}
