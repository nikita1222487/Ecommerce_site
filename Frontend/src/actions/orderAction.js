import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL
} from "../constants/orderConstants"

import axios from 'axios'
import { CLEAR_ERRORS } from "../constants/productConstants";


//Create order

export const createOrder =(order)=>async(dispatch,getState)=>{
    try{

        dispatch({type:CREATE_ORDER_REQUEST});

        const config={
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data}= await axios.post("api/v1/orderr/new",order,config)

        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
    }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}

//Clearing errors 
export const cleaerErrors=()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
  }

