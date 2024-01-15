import AdminLayout from '@/layouts/AdminLayout'
import { useAccessibleMenu } from '@/hooks/business/useAccessibleMenu'
import AuthRoute from '@/router/components/AuthRoute'

const AdminPage = () => {
	const menuItems = useAccessibleMenu()

	return (
		<AdminLayout menuItems={menuItems}>
			<AuthRoute />
		</AdminLayout>
	)
}

export default AdminPage
