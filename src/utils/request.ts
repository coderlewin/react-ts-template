import { message } from 'antd'
import axios from 'axios'
import { local } from './storage'

const http = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
	timeout: 10000
})

http.interceptors.request.use(
	(config) => {
		const accessToken = local.getAccessToken()
		if (accessToken) {
			config.headers.setAuthorization(`Bearer ${accessToken}`, true)
		}
		return config
	},
	(err) => Promise.reject(err)
)

http.interceptors.response.use(
	(response) => {
		const result = response.data as API.Result
		if (result.code !== 0) {
			message.error(result.description || result.message)
		}
		const accessToken = response.headers?.['x-jwt-token']
		const refreshToken = response.headers?.['x-refresh-token']
		if (accessToken) {
			local.setAccessToken(accessToken)
		}
		if (refreshToken) {
			local.setRefreshToken(refreshToken)
		}
		return response
	},
	async (err) => {
		const statusCode = err.response.status

		const refreshToken = local.getRefreshToken()
		if (statusCode === 401) {
			if (!refreshToken) {
				console.log('没有 refresh token 跳转至登录页面')
				console.log('==============================')

				location.href = '/login'
			} else {
				return axios
					.post('/api/admin/v1/user/refresh_token', undefined, {
						headers: {
							Authorization: `Bearer ${refreshToken}`
						}
					})
					.then((res) => {
						console.log('刷新 token 成功')
						console.log('开始重新发起失败的接口请求')
						console.log('==============================')

						const token = res.headers['x-jwt-token']
						err.config.headers['Authorization'] = 'Bearer ' + token
						return axios(err.config)
					})
					.catch((err) => {
						message.error('登录授权已失效')
						console.log('err', err)
						console.log('refresh token 不合法或已失效, 将跳转至登录页')
						console.log('==============================')
						setTimeout(() => {
							localStorage.clear()
							location.href = '/login'
						}, 2000)
					})
			}
		}
		return Promise.reject(err)
	}
)

export default http
