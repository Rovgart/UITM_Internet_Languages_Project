"use server";
import { useQuery } from "@tanstack/react-query";

export const useGetBooks = (collectionName: string, fetch: () => void) => {
  return useQuery({
    queryKey: [collectionName],
    queryFn: () => fetch(),
  });
};
