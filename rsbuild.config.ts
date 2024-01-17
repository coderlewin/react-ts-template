/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-04 13:36:34
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-12 23:30:47
 * @FilePath: /react-rsbuild-tpl/rsbuild.config.ts
 */
import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginImageCompress } from '@rsbuild/plugin-image-compress'

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = defineConfig({
	plugins: [pluginReact(), pluginSvgr(), pluginBabel(), pluginImageCompress()],
	source: {
		alias: {
			'@': './src'
		},
		define: {}
	},
	performance: {
		chunkSplit: {
			strategy: 'split-by-experience',
			forceSplitting: {
				antd: /node_modules[\\/]antd/
			}
		}
	}
})

const devConfig = mergeRsbuildConfig(
	baseConfig,
	defineConfig({
		output: {
			sourceMap: {
				js: 'inline-cheap-source-map'
			}
		},
		server: {
			port: 5888,
			proxy: {
				'/api': {
					target: 'http://localhost:8080',
					changeOrigin: true,
					pathRewrite: { '^/api': '' }
				}
			}
		},
		dev: {}
	})
)

const prodConfig = mergeRsbuildConfig(
	baseConfig,
	defineConfig({
		output: {
			sourceMap: {
				js: false
			}
		}
	})
)

export default isDev ? devConfig : prodConfig
