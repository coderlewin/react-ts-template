/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-13 15:28:54
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-13 15:38:26
 * @FilePath: /react-rsbuild-tpl/src/pages/interface/index.tsx
 */
import { useThemeToken } from '@/hooks'
import { PageContainer } from '@ant-design/pro-components'

const InterfacePage = () => {
	const token = useThemeToken()
	return (
		<PageContainer title="接口管理" style={{ backgroundColor: token.colorBgBase }}>
			接口管理
		</PageContainer>
	)
}

export default InterfacePage
