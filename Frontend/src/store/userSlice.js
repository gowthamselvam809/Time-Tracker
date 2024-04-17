import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice(
    {
        name: 'userData',
        initialState: {
            data: {}
        },
        reducers: {
            setUserInfo: (state, action) => {
                state.data = action.payload
            },
        },
    },
)

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer