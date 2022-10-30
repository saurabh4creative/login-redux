import userConstants from "../_constants/userConstants";

const initialState = {
    isLoading : false,
    status : false,
    error : false,
    user : []
};

const registerReducer = (state = initialState, action) => {
      switch( action.type ){
           case userConstants.REGISTER_REQUEST :
              return {
                   ...state,
                   isLoading : true,
                   status : false,
                   error : false,
                   user : []
              }
           case userConstants.REGISTER_SUCCESS : 
              return {
                   ...state,
                   isLoading : false,
                   status : true,
                   user : action.payload,
                   error : false
              };
           case userConstants.REGISTER_FAILURE : 
              return {
                   ...state,
                   isLoading : false,
                   status : false,
                   error : action.payload,
                   user : []
              };
           default : return state;      
      }
}

export default registerReducer;