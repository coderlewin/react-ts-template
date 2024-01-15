declare namespace API {
	type getIdParams = {
		/** 用户ID */
		id: number
	}

	type LoginRequest = {
		account?: string
		password?: string
	}

	type RegisterRequest = {
		account?: string
		check_password?: string
		password?: string
	}

	type Result = {
		code?: number
		data?: any
		description?: string
		message?: string
	}

	type UserVO = {
		access_key?: string
		account?: string
		avatar_url?: string
		create_time?: number
		gender?: number
		id?: number
		secret_key?: string
		update_time?: number
		user_name?: string
		user_role?: string
		wechat_open_id?: string
		wechat_union_id?: string
	}
}
