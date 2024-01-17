import request from '@/utils/request'

/** 后台系统获取用户详情（admin角色） 获取用户详情接口，需要 admin 角色 GET /admin/v1/user/${param0} */
export async function getUserId(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.getUserIdParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params
	return request<API.Result & { data?: API.UserVO }>(`/admin/v1/user/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {})
	})
}

/** 分页查询用户列表 分页查询用户列表 GET /admin/v1/user/list */
export async function getUserList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.getUserListParams,
	options?: { [key: string]: any }
) {
	return request<API.Result & { data?: API.UserPageVO }>(`/admin/v1/user/list`, {
		method: 'GET',
		params: {
			...params
		},
		...(options || {})
	})
}

/** 后台系统登录 后台系统用户登录接口 POST /admin/v1/user/login */
export async function postUserLogin(body: API.LoginRequest, options?: { [key: string]: any }) {
	return request<API.Result & { data?: boolean }>(`/admin/v1/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		data: body,
		...(options || {})
	})
}

/** 获取当前登录用户信息 获取当前登录用户信息 GET /admin/v1/user/profile */
export async function getUserProfile(options?: { [key: string]: any }) {
	return request<API.Result & { data?: API.UserVO }>(`/admin/v1/user/profile`, {
		method: 'GET',
		...(options || {})
	})
}

/** 后台系统刷新 token 接口 后台系统刷新token POST /admin/v1/user/refresh_token */
export async function postUserRefreshToken(options?: { [key: string]: any }) {
	return request<API.Result & { data?: boolean }>(`/admin/v1/user/refresh_token`, {
		method: 'POST',
		...(options || {})
	})
}

/** 注册接口 系统用户注册接口 POST /admin/v1/user/register */
export async function postUserRegister(
	body: API.RegisterRequest,
	options?: { [key: string]: any }
) {
	return request<API.Result & { data?: number }>(`/admin/v1/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		data: body,
		...(options || {})
	})
}
