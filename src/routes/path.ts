import User from "./UserRouter";

export const BasePaths = {
  MAIN: "/app",
};
export const PublicPaths = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-Password",
  RESET_PASSWORD: "/reset-Password/:id",
  UNAUTHORIZED: "*",
};

export const PrivatePaths = {
  USER: "/user/",
  ADMIN: "/app/",
  INSTRUCTOR: "/teacher/",
  MAIN: "/dashboard",
};
