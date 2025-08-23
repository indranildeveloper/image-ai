import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/hono/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["duplicate"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["duplicate"]["$post"]
>["param"];

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[":projectId"].duplicate.$post({
        param,
      });

      if (!response.ok) {
        throw new Error("Something went wrong while duplicating the project!");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["projects"],
        })
        .catch((error) => {
          console.error(
            "Something went wrong while invalidating projects query!",
            error,
          );
        });
    },
    onError: () => {
      toast.error("Something went wrong while duplicating the project!");
    },
  });

  return mutation;
};
