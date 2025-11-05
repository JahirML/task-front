import { getUser } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

function useAuth() {
  const token = localStorage.getItem("AUTH_TOKEN_TASKFLOW");
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return { user, isLoading, isError, error };
}

export default useAuth;
