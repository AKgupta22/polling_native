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
    name: 'getPolls',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        getPollsSuccess(state, action) {
            state.isSuccess = true,
                state.isLoading = false,
                state.data = action.payload
        },
        hasError(state, action) {
            state.isLoading = false,
                state.isError = true,
                state.data = action.payload
        },
        getPollsReset(state) {
            state.data = {},
                state.isSuccess = false,
                state.isError = false
        }
    }
})

export function getPollsRequest() {
    return async () => {
        dispatch(slice.actions.startLoading())
        try {
            const response = await axios.get("list_polls")
            if (response.data.error === 0)

                dispatch(slice.actions.getPollsSuccess(response.data))
            else

                dispatch(slice.actions.hasError(response.data))
        }

        catch (e) {
            dispatch(slice.actions.hasError(e))
        }
    }
}

export default slice.reducer
export const { getPollsReset } = slice.actions