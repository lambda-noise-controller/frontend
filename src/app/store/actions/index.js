import axios from 'axios';

// LOGIN

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const POST_LOGIN_URL = 'https://bw-noise-controller.herokuapp.com/api/login';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post(POST_LOGIN_URL, creds)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', creds.username);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_ERROR, error: err });
    });
};

// REGISTER

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

const POST_REGISTER_URL =
  'https://bw-noise-controller.herokuapp.com/api/register';

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  return axios
    .post(POST_REGISTER_URL, creds)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_ERROR, error: err });
    });
};

// ADD CLASSROOM

export const ADD_CLASSROOM_START = 'ADD_CLASSROOM_START';
export const ADD_CLASSROOM_SUCCESS = 'ADD_CLASSROOM_SUCCESS';
export const ADD_CLASSROOM_ERROR = 'ADD_CLASSROOM_ERROR';

const CLASSROOM_URL =
  'https://bw-noise-controller.herokuapp.com/api/classrooms/';

export const addClassroom = (token, name, userId) => dispatch => {
  dispatch({ type: ADD_CLASSROOM_START });
  return axios
    .post(
      CLASSROOM_URL,
      {
        teacher_id: userId,
        classroom: name,
        threshold: 130,
        timer: 1
      },
      { headers: { authorization: token } }
    )
    .then(res => {
      dispatch({ type: ADD_CLASSROOM_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_CLASSROOM_ERROR, error: err });
    });
};

export const GET_CLASSROOM_START = 'GET_CLASSROOM_START';
export const GET_CLASSROOM_SUCCESS = 'GET_CLASSROOM_SUCCESS';
export const GET_CLASSROOM_ERROR = 'GET_CLASSROOM_ERROR';

export const getClassroom = (token, userId) => dispatch => {
  dispatch({ type: GET_CLASSROOM_START });
  return axios
    .get(CLASSROOM_URL + userId, { headers: { authorization: token } })
    .then(res => {
      dispatch({ type: GET_CLASSROOM_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_CLASSROOM_ERROR, error: err });
    });
};

// GET ACCOUNT

export const GET_ACCOUNT_START = 'GET_ACCOUNT_START';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const GET_ACCOUNT_ERROR = 'GET_ACCOUNT_ERROR';

const GET_ACCOUNT_URL =
  '	https://bw-noise-controller.herokuapp.com/api/accounts';

export const getUserId = (token, name) => dispatch => {
  dispatch({ type: GET_ACCOUNT_START });
  return axios
    .get(GET_ACCOUNT_URL, { headers: { authorization: token } })
    .then(res => {
      console.log(res);
      const user = res.data.find(user => name === user.username);
      localStorage.setItem('userId', user.id);
      dispatch({ type: GET_ACCOUNT_SUCCESS, payload: user.id });
    })
    .catch(err => {
      dispatch({ type: GET_ACCOUNT_ERROR, error: err });
    });
};
