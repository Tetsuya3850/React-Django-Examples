import axios from "axios";
import { getToken } from "./helper";

const SERVER_URL = "http://127.0.0.1:8000";

const register = payload =>
  axios.post(`${SERVER_URL}/rest-auth/registration/`, payload);

const login = payload => axios.post(`${SERVER_URL}/rest-auth/login/`, payload);

const getUser = () =>
  axios.get(`${SERVER_URL}/rest-auth/user`, {
    headers: { Authorization: `Token ${getToken()}` }
  });

const logout = () =>
  axios.post(`${SERVER_URL}/rest-auth/logout/`, {
    headers: { authorization: `Token ${getToken()}` }
  });

const getSecret = () =>
  axios.get(`${SERVER_URL}/secret/`, {
    headers: { authorization: `Token ${getToken()}` }
  });

const api = {
  register,
  login,
  getUser,
  logout,
  getSecret
};
export default api;
