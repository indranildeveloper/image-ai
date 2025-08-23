import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/hono/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$patch"]
>["json"];

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["project", { projectId }],
    mutationFn: async (json) => {
      const response = await client.api.projects[":projectId"].$patch({
        json,
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating the project!");
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
      queryClient
        .invalidateQueries({ queryKey: ["project", { projectId }] })
        .catch((error) => {
          console.error(
            "Something went wrong while invalidating project update query!",
            error,
          );
        });
    },
    onError: () => {
      toast.error("Something went wrong while updating the project!");
    },
  });

  return mutation;
};
