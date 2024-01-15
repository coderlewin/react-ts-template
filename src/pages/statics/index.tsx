/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-13 15:28:54
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-13 15:30:07
 * @FilePath: /react-rsbuild-tpl/src/pages/statics/index.tsx
 */
import { useThemeToken } from '@/hooks'
import { PageContainer } from '@ant-design/pro-components'

const StaticsPage = () => {
	const token = useThemeToken()
	return (
		<PageContainer title="数据统计" style={{ backgroundColor: token.colorBgBase }}>
			StaticsPage
		</PageContainer>
	)
}

export default StaticsPage
