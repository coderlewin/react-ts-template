import luapi from '@/services/luapi'
import { useQuery } from '@tanstack/react-query'

export function useAuthUser() {
	const { data } = useQuery({ queryKey: ['authUser'], queryFn: luapi.getProfile })
	return data?.data.data as API.UserVO | undefined
}
