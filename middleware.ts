// import { NextResponse } from "next/server";

// export const corsMiddleware = () => {
//   const response = NextResponse.next();
//   response.headers.set("Access-Control-Allow-Origin", "*");
//   response.headers.set(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   response.headers.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );
//   return response;
// };

// export { auth as middleware } from "@/auth";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
});
