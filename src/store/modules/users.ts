import { createSlice } from '@reduxjs/toolkit'

export interface UsersState {}

// Define the initial state using that type
const initialState: UsersState = {}

export const usersSlice = createSlice({
	name: 'users',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {}
})
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users.value

export default usersSlice.reducer
