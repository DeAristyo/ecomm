import Axios from 'axios';
import { API_URL } from '../../constats/API';

export const registerUser = ({ fullname, username, email, password }) => {
    return (dispatch) => {
        Axios.post(`${API_URL}/users`, {
            fullname, 
            username,
            email,
            password,
            role: "user"
        })
        .then(()=>{
            alert('Berhasil mendaftarkan user')
        })
        .catch(() => {
            alert('Gagal mendaftarkan user')
        })
    }
}