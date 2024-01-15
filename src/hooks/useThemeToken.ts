/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-12 16:53:25
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-12 18:18:04
 * @FilePath: /react-rsbuild-tpl/src/hooks/useThemeToken.ts
 */
import { theme } from 'antd'

export function useThemeToken() {
	const { token } = theme.useToken()
	return token
}
