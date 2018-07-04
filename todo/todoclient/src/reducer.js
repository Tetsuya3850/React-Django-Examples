import api from "./api";

const FETCHING_TODOS = "FETCHING_TODOS";
const FETCHING_TODOS_ERROR = "FETCHING_TODOS_ERROR";
const FETCHING_TODOS_SUCCESS = "FETCHING_TODOS_SUCCESS";
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const TODO_ACTION_FAILURE = "TODO_ACTION_FAILURE";

export const handleFetchTodos = () => async dispatch => {
  dispatch({ type: FETCHING_TODOS });
  try {
    var { data } = await api.fetchTodos();
    dispatch({ type: FETCHING_TODOS_SUCCESS, todos: data });
  } catch (e) {
    dispatch({
      type: FETCHING_TODOS_ERROR,
      error: "Something went wrong!"
    });
  }
};

export const addTodo = (payload, clearInput) => async dispatch => {
  try {
    var { data } = await api.addTodo(payload);
    dispatch({ type: ADD_TODO, todo: data });
    clearInput();
  } catch (e) {
    dispatch({
      type: TODO_ACTION_FAILURE,
      error: "Something went wrong!"
    });
  }
};

export const toggleTodo = id => async dispatch => {
  try {
    await api.toggleTodo(id);
    dispatch({ type: TOGGLE_TODO, id });
  } catch (e) {
    dispatch({
      type: TODO_ACTION_FAILURE,
      error: "Something went wrong!"
    });
  }
};

export const deleteTodo = id => async dispatch => {
  try {
    await api.deleteTodo(id);
    dispatch({ type: DELETE_TODO, id });
  } catch (e) {
    dispatch({
      type: TODO_ACTION_FAILURE,
      error: "Something went wrong!"
    });
  }
};

const initialState = {
  isFetching: false,
  error: "",
  todos: []
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TODOS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_TODOS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCHING_TODOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        todos: action.todos
      };
    case ADD_TODO:
      return {
        ...state,
        error: "",
        todos: [...[action.todo], ...state.todos]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        error: "",
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        })
      };
    case DELETE_TODO:
      return {
        ...state,
        error: "",
        todos: state.todos.filter(t => t.id !== action.id)
      };
    case TODO_ACTION_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default todoAppReducer;
