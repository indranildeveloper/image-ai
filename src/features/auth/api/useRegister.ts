import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/hono/hono";

type ResponseType = InferResponseType<
  (typeof client.api.users.register)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users.register)["$post"]
>["json"];

export const useRegister = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.register.$post({ json });
      if (!response.ok) {
        throw new Error("Something went wrong while registering the user!");
      }
      return await response.json();
    },
    onError: () => {
      toast.error("Something went wrong while registering the user!");
    },
    onSuccess: () => {
      toast.success("User registered successfully!");
    },
  });

  return mutation;
};
