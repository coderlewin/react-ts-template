import { useThemeToken } from '@/hooks'
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space, Typography } from 'antd'
import { ComponentProps, FC, PropsWithChildren, memo, useEffect, useState } from 'react'
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import { css } from '@emotion/css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthUser } from '@/hooks/business/useAuthUser'

interface IAdminLayoutProps {
	menuItems?: ItemType<MenuItemType>[]
}

const AdminLayout: FC<PropsWithChildren<IAdminLayoutProps>> = ({ menuItems, children }) => {
	const token = useThemeToken()
	const navigate = useNavigate()
	const location = useLocation()
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	useEffect(() => {
		setSelectedKeys(location.pathname.split('/').filter((d) => d !== ''))
	}, [location.pathname])
	const user = useAuthUser()

	const handleClickMenu: ComponentProps<typeof Menu>['onClick'] = ({ keyPath }) => {
		const path = keyPath
			.reverse()
			.map((k) => `/${k}`)
			.join('')
		navigate(path)
	}

	const handleClickDropdown: MenuProps['onClick'] = ({ key }) => {
		switch (key) {
			case 'logout':
				navigate('/login', { replace: true })
				localStorage.clear()
				break
			default:
				break
		}
	}

	return (
		<Layout style={{ height: '100vh' }}>
			<header
				className={css({
					backgroundColor: token.colorBgBase,
					borderBottom: `3px solid ${token.colorPrimary}`,
					height: 64,
					padding: '8px 0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				})}>
				<Typography.Title level={4} style={{ marginBottom: 0, marginLeft: 20 }}>
					API 开放平台
				</Typography.Title>
				<Space className={css({ padding: '0 32px' })}>
					<Dropdown
						arrow
						menu={{
							items: [
								{
									key: 'logout',
									danger: true,
									label: '退出登录'
								}
							],
							onClick: handleClickDropdown
						}}>
						<Avatar size={36}>{user?.user_name}</Avatar>
					</Dropdown>
				</Space>
			</header>
			<div
				className={css({
					width: '100%',
					padding: '0px 36px',
					display: 'flex',
					alignItems: 'center',
					backgroundColor: token.colorBgBase,
					borderBottom: `1px solid ${token.colorBorder}`,
					gap: 12
				})}>
				<Typography.Title level={5} style={{ marginBottom: 0 }}>
					LuApi
				</Typography.Title>
				<Menu
					mode="horizontal"
					selectedKeys={selectedKeys}
					className={css({ flex: 1 })}
					onClick={handleClickMenu}
					items={menuItems}
				/>
			</div>
			<Layout.Content className={css({ padding: 20 })}>{children}</Layout.Content>
		</Layout>
	)
}

export default memo(AdminLayout)
