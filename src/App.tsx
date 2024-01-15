import { RouterProvider } from 'react-router-dom'
import { Spin } from 'antd'
import router from './router'

const App = () => {
	return <RouterProvider router={router} fallbackElement={<Spin />} />
}

export default App
