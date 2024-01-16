import request from '@/utils/request'
import { local } from '@/utils/storage'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

let promise: Promise<AxiosResponse<any, any>> | null

export const refreshToken = async () => {
	if (promise) {
		return promise
	}

	const excutor = async (resolve: (v: any) => void) => {
		try {
			const resp = await request.post<any, AxiosResponse<API.Result>>(
				'/admin/v1/user/refresh_token',
				undefined,
				{
					headers: {
						Authorization: `Bearer ${local.getRefreshToken() ?? ''}`
					},
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					__isRefreshToken: true
				}
			)
			resolve(resp.data.code === 0)
		} catch (error) {
			resolve(false)
		}
	}

	promise = new Promise(excutor)
	promise.finally(() => {
		promise = null
	})

	return promise
}

export function isRefreshToken(config: AxiosRequestConfig) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return !!config.__isRefreshToken
}
