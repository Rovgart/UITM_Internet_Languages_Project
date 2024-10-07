import { getCurrentUser } from "@/utils/actions/user/current-user";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });
};
