import { useMemo } from 'react'
import { useAuthUser } from './business/useAuthUser'

export function useAccess() {
	const user = useAuthUser()

	return useMemo(() => {
		return {
			canAdmin: user?.user_role === 'admin'
		}
	}, [user]) as Record<string, boolean>
}
