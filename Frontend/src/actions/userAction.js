import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,LOGOUT_SUCCESS,
  LOAD_USER_FAIL,
  REGISTER_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
} from "../constants/userConstant";

import axios from "axios";

//login

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config={headers:{"Content-Type":"application/json"}}

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({type:LOGIN_SUCCESS,payload:data.user})
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Clearing Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}

//7:54:40
//Register
export const  register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config={headers:{"Content-Type":"multipart/form-data"}}

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/register`,
      userData,
      config
    );
    dispatch({type:REGISTER_USER_SUCCESS,payload:data.user})
  } catch (error) {
    console.log(error)
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
  }
};


//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(
      `/api/v1/me` 
    );
    dispatch({type:LOAD_USER_SUCCESS,payload:data.user})
    console.log(data)
  }
  catch (error) {
    console.log(error,"error")
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};



//logout user
export const logout = () => async (dispatch) => {
  try {
   await axios.get(
      `/api/v1/logout` 
    );
    dispatch({type:LOAD_USER_SUCCESS})
  }
  catch (error) {
    console.log(error,"error")
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};


//Update profile 
export const  updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config={headers:{"Content-Type":"multipart/form-data"}}

    const { data } = await axios.put(
      `/api/v1/me/update`,
      userData,
      config
    );
    dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.user})
  } catch (error) {
    console.log(error)
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
  }
};


export const  updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config={headers:{"Content-Type":"application/js on"}}

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );
    dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.user})
  } catch (error) {
    console.log(error)
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
  }
};




