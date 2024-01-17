import { useMemo } from 'react'
import { useAccess } from '../useAccess'
import { authRoutes, getMenuData } from '@/router/auth-routes'

export function useAccessibleMenu() {
	const access = useAccess()
	return useMemo(
		() =>
			getMenuData(
				authRoutes.filter((r) => {
					if (r.access) {
						const isAccess = access[r.access]
						if (isAccess) {
							return true
						} else {
							return false
						}
					}
					return true
				})
			),
		[access]
	)
}
