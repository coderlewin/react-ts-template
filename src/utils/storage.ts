import { STORAGE_KEY } from '@/constants/keys'
import { isJson } from './tools'

const setStorage = <T = unknown>(key: string, value: T) => {
	const saveData = JSON.stringify(value)
	localStorage.setItem(key, saveData)
}

const getStorage = <T = unknown>(key: string): T | null => {
	const value = localStorage.getItem(key)
	if (!value) return null
	if (isJson(value)) {
		return JSON.parse(value) as T
	}
	return value as T
}

export const local = {
	getAccessToken: () => {
		return getStorage<string>(STORAGE_KEY.ACCESS_TOKEN)
	},
	setAccessToken: (value: string) => {
		setStorage(STORAGE_KEY.ACCESS_TOKEN, value)
	},
	getRefreshToken: () => {
		return getStorage<string>(STORAGE_KEY.REFRESH_TOKEN)
	},
	setRefreshToken: (value: string) => {
		setStorage(STORAGE_KEY.REFRESH_TOKEN, value)
	}
}
