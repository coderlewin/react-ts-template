import { local } from '@/utils/storage'
import { Spin } from 'antd'
import { FC, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface IAuthRouteProps {}

const AuthRoute: FC<IAuthRouteProps> = () => {
	const accessToken = local.getAccessToken()

	if (accessToken) {
		return (
			<Suspense fallback={<Spin />}>
				<Outlet />
			</Suspense>
		)
	}

	return <Navigate to={'/login'} replace />
}

export default AuthRoute
