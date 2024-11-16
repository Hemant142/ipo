import axios from "axios";
import { USER_LOADING } from "../actionTypes";

let NewURL=process.env.REACT_APP_NewURL 


export const gernateOTP = (data) => (dispatch) => {
 
    dispatch({ type: USER_LOADING });
    return axios.post(
      `${NewURL}auth/genrate-otp?userId=${data.userId}&password=${data.password}`
    );
  };
  
  export const requestOTP = (token) => (dispatch) => {
 
    dispatch({ type: USER_LOADING });
    return axios.post(
      `${NewURL}web-app/manager/request-otp?managerRole=researchAnalyst`,
      {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
    );
  };

  // Action for OTP verification
  export const otpVarificationManager = (data, authToken) => (dispatch) => {
    dispatch({ type: USER_LOADING }); // Dispatch loading state
  
    return axios.post(
      `${NewURL}auth/verify-otp?otp=${data.otp}`, 
      {}, // Pass an empty object for the body
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Pass Bearer token for authentication
        },
      }
    );
  };