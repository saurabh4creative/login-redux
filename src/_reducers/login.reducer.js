import userConstants from "../_constants/userConstants";

let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    isLoading : false,
    isLoggedIn : user ? true : false,
    status : false,
    error  : false,
    user   : user ? user : [],
};

const loginReducer = (state = initialState, action) => {
      switch( action.type ){
           case userConstants.LOGIN_REQUEST :
              return {
                   ...state,
                   isLoading : true,
                   status : false,
                   error : false,
                   user : []
              }
           case userConstants.LOGIN_SUCCESS : 
              return {
                   ...state,
                   isLoading : false,
                   status : true,
                   user : action.payload,
                   error : false,
                   isLoggedIn : true
              };
           case userConstants.LOGIN_FAILURE : 
              return {
                   ...state,
                   isLoading : false,
                   status : false,
                   error : action.payload,
                   isLoggedIn : false,
                   user : []
              };
            case userConstants.LOG_OUT : 
              return {
                   ...state,
                   isLoading : false,
                   status : false,
                   error : false,
                   isLoggedIn : false,
                   user : []
              };   
           default : return state;      
      }
}

export default loginReducer;