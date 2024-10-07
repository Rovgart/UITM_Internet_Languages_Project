import { fetchBookPreview } from "@/utils/actions/book-preview";
import { useQuery } from "@tanstack/react-query";

export const useGetBook = (id: string) => {
  return useQuery({
    queryFn: () => fetchBookPreview(id),
    queryKey: ["book", id],
  });
};
