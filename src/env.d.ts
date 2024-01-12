/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-04 13:36:34
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-04 13:44:15
 * @FilePath: /react-rsbuild-tpl/src/env.d.ts
 */
/// <reference types="@rsbuild/core/types" />

declare module '*.svg' {
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	const content: string
	export default content
}
