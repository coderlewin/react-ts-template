import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { local } from '@/utils/storage'
import luapi from '@/services/luapi'
import { message } from 'antd'

// Define a type for the slice state
export interface AuthState {
	accessToken: string | null
}

// Define the initial state using that type
const initialState: AuthState = {
	accessToken: local.getAccessToken()
}

export const mutateUserLogin = createAsyncThunk(
	'auth/userLogin',
	async (params: API.LoginRequest) => {
		try {
			await luapi.postLogin(params)
			history.replaceState('', '', '/')
			message.success('登录成功')
		} catch (error) {
			console.log('login error:', error)
		}
	}
)

export const authSlice = createSlice({
	name: 'auth',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {}
})

// export const {} = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value

export default authSlice.reducer
