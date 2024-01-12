/*
 * @Author: lewinlu@chatlabs.com
 * @Date: 2024-01-04 13:36:34
 * @LastEditors: lewinlu@chatlabs.com
 * @LastEditTime: 2024-01-04 14:38:01
 * @FilePath: /react-rsbuild-tpl/src/App.tsx
 */
import { Button } from 'antd'
import { useEffect, useState } from 'react'

const App = () => {
	const [show] = useState(false)

	useEffect(() => {
		console.log('show: ', show)
	}, [show])

	return (
		<div className="content">
			<Button type="primary">Button</Button>
			<h1>Rsbuild with React</h1>
			<p>Start building amazing things with Rsbuild.</p>
		</div>
	)
}

export default App
