import { InferResponseType } from "hono";
import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "@/hono/hono";

export type ProjectsResponseType = InferResponseType<
  (typeof client.api.projects)["$get"],
  200
>;

export const useGetProjects = () => {
  const query = useInfiniteQuery<ProjectsResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.projects.$get({
        query: {
          page: (pageParam as number).toString(),
          limit: "5",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the projects!");
      }

      return response.json();
    },
  });

  return query;
};
