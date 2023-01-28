import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: ''
}

const slice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        tokenSuccess(state, action) {
            state.data = action.payload
        },
        tokenReset(state) {
            state.data = ''
        }
    }
})

export default slice.reducer
export const { tokenReset, tokenSuccess } = slice.actions
