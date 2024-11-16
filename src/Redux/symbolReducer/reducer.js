import { StairsTwoTone } from "@mui/icons-material"
import { GET_SYMBOLS_SUCCESS, GET_UNDERLYING_INDEX_SUCCESS, SYMBOLS_FAILURE, SYMBOLS_REQUEST, UNDERLYING_INDEX_FAILURE, UNDERLYING_INDEX_REQUEST } from "../actionTypes"


const initialState ={
    symbols : [], 
    underlyingIndex :[],
    isLoading:false,
    isError:false,
    error:""
}

export const reducer =(state=initialState,action)=>{
    switch(action.type){
        case SYMBOLS_REQUEST :
            return  {
                ...state,
                isLoading:true,
              
            }
        case SYMBOLS_FAILURE :
            return {
                ...state,
                isLoading :false ,
                isError :true, 
                error :action.payload
            }
        case GET_SYMBOLS_SUCCESS :
            return  {
                ...state, 
                isLoading:false,
                isError:false,
                symbols:action.payload
            }
        case UNDERLYING_INDEX_REQUEST :
            return  {...state, isLoading:true,isError:false}
        case UNDERLYING_INDEX_FAILURE :
            return {
                ...state,
                isLoading:false,
                isError:true,
                error:action.payload
            }
        case GET_UNDERLYING_INDEX_SUCCESS :
            return {
                ...state,
                isLoading:false,
                isError:false,
                underlyingIndex :action.payload
            }
        default :
        return state
    }
}