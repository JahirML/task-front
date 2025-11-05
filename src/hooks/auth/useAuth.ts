import { getUser } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

function useAuth() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return { user, isLoading, isError, error };
}

export default useAuth;
