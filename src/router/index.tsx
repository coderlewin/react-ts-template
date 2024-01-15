import { Navigate, createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/login'
import AdminPage from '@/pages/admin'
import NotFound from '@/pages/not-found'
import { authRoutes, getRoutesData } from './auth-routes'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AdminPage />,
		children: [
			{
				path: '/',
				index: true,
				element: <Navigate to={'/open-interface'} replace />
			},
			...getRoutesData(authRoutes)
		]
	},
	{
		path: 'login',
		element: <LoginPage />
	},
	{
		path: '*',
		element: <NotFound />
	}
])

export default router
