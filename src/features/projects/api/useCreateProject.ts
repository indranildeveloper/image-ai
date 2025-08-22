import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/hono/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)["$post"]
>["json"];

export const useCreateProject = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong while creating the project!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Project created successfully!");

      // TODO: invalidate projects query
    },
    onError: () => {
      toast.error("Something went wrong while creating the project!");
    },
  });

  return mutation;
};
