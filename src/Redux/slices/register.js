import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { dispatch } from "../store";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
}

const slice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        registrationSuccess(state, action) {
            state.isSuccess = true,
                state.isLoading = false,
                state.data = action.payload
        },
        hasError(state, action) {
            state.isLoading = false,
                state.isError = true,
                state.data = action.payload
        },
        registrationReset(state) {
            state.data = {},
                state.isSuccess = false,
                state.isError = false
        }
    }
})

export function registrationRequest(payload) {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await axios.get(`add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`)
            if (response.data.error === 0)
                dispatch(slice.actions.registrationSuccess(response.data))
            else
                dispatch(slice.actions.hasError(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { registrationReset } = slice.actions