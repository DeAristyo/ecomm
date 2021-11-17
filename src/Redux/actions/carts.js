import Axios from 'axios';
import { API_URL } from '../../constats/API'

export const getCartData = (userId) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/carts`,{
            params: {
                userId,
            }
        })
        .then((result)=>{
            //Dispatch to cartReducer dengan payload -> result.data
            dispatch({
                type: 'FILL_CART',
                payload: result.data,
            })
        })
        .catch((err)=>{
            alert("System Error")
        })
    }
}