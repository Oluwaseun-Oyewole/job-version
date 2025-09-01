import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";

const NotFound = () => {
  return redirect(routes.home);
};

export default NotFound;
