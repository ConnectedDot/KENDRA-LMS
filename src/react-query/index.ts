import { QueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const userProps = {
  id: 1,
  name: "John Doe",
  email: " ddd",
  password: "password",
};

function queryErrorHandler(error: unknown) {
  // const id = "react-query-error";
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  message.error(title);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      // cacheTime: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
    },
  },
});
