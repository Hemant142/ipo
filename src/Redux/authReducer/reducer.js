import {
  USER_LOADING,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../actionTypes";

let initialState = {
  isLoading: false,
  isError: false,
  error: "",
  userData: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        userData: payload,
      };
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: payload,
      };
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: {},
      };
    }
    default: 
      return state;
    
  }
};
