import api from "./api";
import { getToken, saveToken, removeToken } from "./helper";

const AUTH_USER = "AUTH_USER";
const GET_USER = "GET_USER";
const UNAUTH_USER = "UNAUTH_USER";
const REGISTER_FAIL = "REGISTER_FAIL";
const LOGIN_FAIL = "LOGIN_FAIL";

const authUser = () => {
  return { type: AUTH_USER };
};

const getUser = userInfo => {
  return {
    type: GET_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const registerFail = errors => {
  return {
    type: REGISTER_FAIL,
    errors
  };
};

const loginFail = errors => {
  return {
    type: LOGIN_FAIL,
    errors
  };
};

export const registerUser = (payload, redirect) => async dispatch => {
  try {
    await api.register(payload);
    redirect();
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    let { data } = e.response;
    console.log(data);
    dispatch(registerFail(data));
  }
};

export const loginUser = (payload, redirect) => async dispatch => {
  try {
    let { data } = await api.login(payload);
    saveToken(data.key);
    dispatch(authUser());
    redirect();
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    let { data } = e.response;
    console.log(data);
    dispatch(loginFail(data));
  }
};

export const reAuthUser = redirect => async dispatch => {
  const token = getToken();
  if (token !== null) {
    dispatch(authUser());
    try {
      let { data } = await api.getUser();
      dispatch(getUser(data));
    } catch (e) {
      console.log(e.response);
    }
  }
};

export const logoutUser = redirect => async dispatch => {
  try {
    await api.logout();
    removeToken();
    dispatch(unAuthUser());
    redirect();
  } catch (e) {
    console.log(e.response);
  }
};

export const getUserInfo = () => async dispatch => {
  try {
    let { data } = await api.getUser();
    dispatch(getUser(data));
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  isAuthed: false,
  registerErrors: {},
  loginErrors: {},
  userInfo: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        registerErrors: {},
        loginErrors: {}
      };
    case GET_USER:
      return {
        ...state,
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return initialState;
    case REGISTER_FAIL:
      return {
        ...state,
        registerErrors: action.errors
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginErrors: action.errors
      };
    default:
      return state;
  }
};

export default authReducer;
