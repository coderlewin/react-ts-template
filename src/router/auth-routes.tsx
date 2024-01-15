import { ApiOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons'
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import { ReactNode, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

export type MenuRouteType = Omit<RouteObject, 'children'> & {
	label?: string
	icon?: ReactNode
	children?: Array<MenuRouteType>
	access?: string
}

export const getRoutesData = (data: MenuRouteType[]): RouteObject[] => {
	const result: RouteObject[] = []
	data.forEach((d) => {
		let child: RouteObject[] | undefined = undefined
		if (d?.children) {
			child = getRoutesData(d.children)
		}
		const item: RouteObject = {
			path: d.path,
			children: child,
			element: d.element,
			lazy: d.lazy,
			loader: d.loader
		}
		result.push(item)
	})
	return result
}

export const getMenuData = (data: MenuRouteType[]): ItemType<MenuItemType>[] => {
	const result: ItemType<MenuItemType>[] = []
	data.forEach((d) => {
		let child: ItemType<MenuItemType>[] | undefined = undefined
		if (d?.children) {
			child = getMenuData(d.children)
		}
		const item: ItemType<MenuItemType> = {
			key: d.path!,
			icon: d.icon,
			label: d.label,
			children: child
		}
		result.push(item)
	})
	return result
}

const LazyOpenInterfacePage = lazy(() => import('@/pages/open-interface'))
const LazyStaticsPage = lazy(() => import('@/pages/statics'))
const LazyUsersPage = lazy(() => import('@/pages/users'))
const LazyInterfacePage = lazy(() => import('@/pages/interface'))

export const authRoutes: MenuRouteType[] = [
	{
		label: '开放接口',
		icon: <ApiOutlined />,
		path: 'open-interface',
		element: <LazyOpenInterfacePage />
	},
	{
		label: '数据统计',
		icon: <BarChartOutlined />,
		path: 'statics',
		element: <LazyStaticsPage />
	},
	{
		label: '系统管理',
		icon: <SettingOutlined />,
		path: 'system',
		access: 'canAdmin',
		children: [
			{
				label: '用户管理',
				path: 'users',
				element: <LazyUsersPage />
			},
			{
				label: '接口管理',
				path: 'interface',
				element: <LazyInterfacePage />
			}
		]
	}
]
