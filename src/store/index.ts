import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './modules/users'
import authReducer from './modules/auth'

const store = configureStore({
	reducer: {
		users: usersReducer,
		auth: authReducer
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
