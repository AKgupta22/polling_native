import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from './slices/login'
import registerReducer from "./slices/register";
import getPollsReducer from "./slices/getPolls";
import tokenReducer from "./slices/Token";

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registerReducer,
    getPolls: getPollsReducer,
    getToken: tokenReducer
})
export default rootReducer