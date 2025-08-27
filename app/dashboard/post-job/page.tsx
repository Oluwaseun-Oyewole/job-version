import { isServerTokenValid } from "@/utils/helper";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function postJob() {
  if (!(await isServerTokenValid())) return redirect(routes.login);
  return (
    <>
      <p>Create jobs here</p>
    </>
  );
}
