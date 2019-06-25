import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const POST_LOGIN_URL = 'https://bw-noise-controller.herokuapp.com/api/login';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  console.log(creds);
  return axios
    .post(POST_LOGIN_URL, creds)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_ERROR, error: err });
    });
};

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

const POST_REGISTER_URL =
  'https://bw-noise-controller.herokuapp.com/api/register';

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  axios
    .post(POST_REGISTER_URL, creds)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_ERROR, error: err });
    });
};
