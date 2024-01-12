/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-04 13:36:34
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-04 14:02:47
 * @FilePath: /react-rsbuild-tpl/src/index.tsx
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
