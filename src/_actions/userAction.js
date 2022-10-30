import userConstants  from "../_constants/userConstants";

// User Post request to register
const _registerStart = () => {
     return {
          type : userConstants.REGISTER_REQUEST
     }
}

const _registerSuccess = (user) => {
    return {
        type : userConstants.REGISTER_SUCCESS,
        payload : user
    }
}

const _registerFailure = (error) => {
    return {
        type : userConstants.REGISTER_FAILURE,
        payload : error
    }
}

const _loginStart = () => {
    return {
        type : userConstants.LOGIN_REQUEST
    }
}

const _loginSuccess = (user) => {
    if( user ){
        localStorage.setItem("user", JSON.stringify(user));
    }
     
    return {
        type : userConstants.LOGIN_SUCCESS,
        payload : user
    }
}

const _loginFailure = (error) => { 
    return {
        type : userConstants.LOGIN_FAILURE,
        payload : error
    }
}

const _logout = () => {
    return async (dispatch) => {
        await localStorage.removeItem('user'); 
        dispatch({
            type : userConstants.LOG_OUT
        })
    }
}

export const userActions = {
    _registerStart, 
    _registerSuccess,
    _registerFailure,
    _loginStart,
    _loginSuccess,
    _loginFailure,
    _logout
};