export function isJson(str: string) {
	try {
		JSON.parse(str) // 尝试将字符串解析为JSON对象
		return true
	} catch (e) {
		return false
	}
}
