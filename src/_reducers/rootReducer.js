import { combineReducers } from "redux";
import registerReducer from "./registration.reducer";
import loginReducer from "./login.reducer";

const rootReducer = combineReducers({
    registerReducer, loginReducer
});

export default rootReducer;