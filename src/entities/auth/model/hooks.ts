import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser, login } from "./api"

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
  })
}

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  })
}
