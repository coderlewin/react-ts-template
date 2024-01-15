/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-13 15:28:54
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-13 15:38:09
 * @FilePath: /react-rsbuild-tpl/src/pages/open-interface/index.tsx
 */
import { useThemeToken } from '@/hooks'
import { PageContainer } from '@ant-design/pro-components'

const OpenInterfacePage = () => {
	const token = useThemeToken()
	return (
		<PageContainer title="开放接口" style={{ backgroundColor: token.colorBgBase }}>
			开放接口
		</PageContainer>
	)
}

export default OpenInterfacePage
