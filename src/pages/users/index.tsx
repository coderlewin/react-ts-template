import { useThemeToken } from '@/hooks'
import { PageContainer } from '@ant-design/pro-components'

const UsersPage = () => {
	const token = useThemeToken()
	return (
		<PageContainer title="用户管理" style={{ backgroundColor: token.colorBgBase }}>
			UsersPage
		</PageContainer>
	)
}

export default UsersPage
