import { getAllIngredients, getOrderNumber, signUp, signIn, signOut, getUserInfo, updateUserInfo, updateToken, getConfirmation, setNewPassword } from '../../utils/api';
import { setCookie } from '../../utils/utils'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT';
export const CLEAR_CURRENT_CONSTRUCTOR = 'CLEAR_CURRENT_CONSTRUCTOR';

export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const REQUEST_CODE_REQUEST = 'REQUEST_CODE_REQUEST';
export const REQUEST_CODE_SUCCESS = 'REQUEST_CODE_SUCCESS';
export const REQUEST_CODE_FAILED = 'REQUEST_CODE_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getAllIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    })
    .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
  }
}

export const getOrder = (orderData) => {
  return function(dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    getOrderNumber(orderData).then(res => {
      if (res) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res,
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
    .catch(() => dispatch({ type: GET_ORDER_FAILED }));
  }
}

  //auth
export const register = (data) => {
  return function(dispatch) {
    dispatch({ type: REGISTER_USER_REQUEST });
      signUp(data).then((res) => {
        if (res.success) {
          setCookie('token', res.accessToken, { expires: 1200 });
          localStorage.setItem('jwt', res.refreshToken);
          dispatch({
            type: REGISTER_USER_SUCCESS,
            user: res.user,
          })
        }
    })
    .catch(() => dispatch({ type: REGISTER_USER_FAILED }));
  }
}
  
  export const login = (data) => {
    return function(dispatch) {
      dispatch({ type: LOGIN_USER_REQUEST });
      signIn(data).then((res) => {
        if (res.success) {
          setCookie('token', res.accessToken, { expires: 1200 });
          localStorage.setItem('jwt', res.refreshToken);
          dispatch({
            type: LOGIN_USER_SUCCESS,
            user: res.user,
          })
        }
      })
      .catch(() => dispatch({ type: LOGIN_USER_FAILED }));
    }
  }
  
export const logout = () => {
  return function(dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    signOut().then((res) => {
      if (res.success) {
        localStorage.removeItem('jwt');
        setCookie('token', null, { expires: -1 });
        dispatch({ type: LOGOUT_SUCCESS});
      }
    })
    .catch(() => dispatch({ type: LOGOUT_FAILED }));
  }
}
  
export const refreshToken = () => {
  return function(dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST })
    updateToken().then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          user: res.user,
        })
      }
    })
    .catch(() => dispatch({ type: UPDATE_TOKEN_FAILED }));
  }
}
  
export const getUser = () => {
  return function(dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    getUserInfo().then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: res.user,
      })
    })
    .then((res) => console.log(res.user))
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        getUserInfo().then((res) => {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          })
        })
      } else {
        dispatch({ type: GET_USER_FAILED });
      }
    })
  }
}

export const updateUser = (data) => {
  return function(dispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUserInfo(data).then((res) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: res.user,
      })
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        dispatch(updateUser(data));
      } else {
        dispatch({ type: UPDATE_USER_FAILED });
      }
    })
  }
}
  
export const requestResetCode = (email) => {
  return function(dispatch) {
    dispatch({ type: REQUEST_CODE_REQUEST });
    getConfirmation(email).then(() => {
      dispatch({ type: REQUEST_CODE_SUCCESS });
    })
    .catch(() => dispatch({ type: REQUEST_CODE_FAILED }));
  }
}
  
export const resetPassword = (data) => {
  return function(dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    setNewPassword(data).then(() => {
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    })
    .catch(() => dispatch({ type: RESET_PASSWORD_FAILED }));
  }
}