import axios from "axios";

const SERVER_URL = "http://127.0.0.1:8000/api";
const fetchTodos = () => axios.get(`${SERVER_URL}/todos/`);
const addTodo = new_todo => axios.post(`${SERVER_URL}/todos/`, new_todo);
const toggleTodo = id => axios.post(`${SERVER_URL}/todos/${id}/toggle/`);
const deleteTodo = id => axios.delete(`${SERVER_URL}/todos/${id}/`);

const api = { fetchTodos, addTodo, toggleTodo, deleteTodo };
export default api;
