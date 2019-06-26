import * as actionType from '../actions';

const initialState = {
  error: '',
  loggingIn: false,
  registeringUser: false,
  token: localStorage.getItem('token')
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case actionType.LOGIN_START:
      return {
        ...state,
        loggingIn: true
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.payload.token
      };
    case actionType.LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        error: action.error
      };
    // REGISTER
    case actionType.REGISTER_START:
      return {
        ...state,
        registeringUser: true
      };
    case actionType.REGISTER_SUCCESS:
      return {
        ...state,
        registeringUser: false
      };
    case actionType.REGISTER_ERROR:
      return {
        ...state,
        registeringUser: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default rootReducer;
