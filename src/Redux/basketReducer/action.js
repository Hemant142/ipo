import axios from "axios";
import { BASKET_FAILURE, BASKET_REQUEST, GET_BASKET_SUCCESS } from "../actionTypes"


let NewURL=process.env.REACT_APP_NewURL 


export const fetchIpoList = (token) => async (dispatch) => {
    dispatch({type : BASKET_REQUEST});
    try{
        const response = await axios.get(`${NewURL}dashboard/ipo-list`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
       if(response.data.status==="success"){
       
        dispatch({
        type: GET_BASKET_SUCCESS,
        payload:response.data.data.ipoList
      })
    }

    }
    catch (error) {
        dispatch({
            type: BASKET_FAILURE,
            payload: error.message || "Failed to fetch IPO list"
        });
    }

}


export const createIPO=(data,token) => async (dispatch) => {
try {
const response = await axios.post(`${NewURL}dashboard/create-ipo`, data,{
    headers : {
        Authorization : `Bearer ${token}`
    }
})
return response
}
catch(error) {
    console.log(error)
}

}