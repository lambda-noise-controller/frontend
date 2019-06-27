import * as actionType from '../actions';

const initialState = {
  token: localStorage.getItem('token'),
  userId: parseInt(localStorage.getItem('userId'), 10),
  username: localStorage.getItem('username'),
  error: '',
  loggingIn: false,
  registeringUser: false,
  addingClassroom: false,
  gettingAccount: false,
  gettingClassroom: false
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case actionType.LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        error: null
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.payload.token,
        error: null
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
        registeringUser: true,
        error: null
      };
    case actionType.REGISTER_SUCCESS:
      return {
        ...state,
        registeringUser: false,
        error: null
      };
    case actionType.REGISTER_ERROR:
      return {
        ...state,
        registeringUser: false,
        error: action.error
      };
    // ADD CLASSROOM
    case actionType.ADD_CLASSROOM_START:
      return {
        ...state,
        addingClassroom: true,
        error: null
      };
    case actionType.ADD_CLASSROOM_SUCCESS:
      return {
        ...state,
        addingClassroom: false,
        error: null
      };
    case actionType.ADD_CLASSROOM_ERROR:
      return {
        ...state,
        addingClassroom: false,
        error: action.error
      };
    // GET ACCOUNT
    case actionType.GET_ACCOUNT_START:
      return {
        ...state,
        gettingAccount: true,
        error: null
      };
    case actionType.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        gettingAccount: false,
        error: null
      };
    case actionType.GET_ACCOUNT_ERROR:
      return {
        ...state,
        gettingAccount: false,
        error: action.error
      };
    // GET CLASSROOM
    case actionType.GET_CLASSROOM_START:
      return {
        ...state,
        gettingClassroom: true,
        error: null
      };
    case actionType.GET_CLASSROOM_SUCCESS:
      return {
        ...state,
        gettingClassroom: false,
        error: null
      };
    case actionType.GET_CLASSROOM_ERROR:
      return {
        ...state,
        gettingClassroom: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default rootReducer;
