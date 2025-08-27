/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  exp: number | undefined;
  jobs: any;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  // interface JWT extends DefaultJWT {
  //   role: UserType;
  // }
}
