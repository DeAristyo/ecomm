import Axios from 'axios';
import { API_URL } from '../../constats/API';

export const registerUser = ({ fullname, username, email, password }) => {
	return (dispatch) => {
		Axios.post(`${API_URL}/users`, {
			fullname,
			username,
			email,
			password,
			role: 'user',
		})
			.then((result) => {
				delete result.data.password;
				dispatch({
					type: 'USER_LOGIN',
					payload: result.data,
				});
				alert('Berhasil mendaftarkan user');
			})
			.catch((err) => {
				alert('Gagal mendaftarkan user');
			});
	};
};

export const loginUser = ({ username, password }) => {
	return (dispatch) => {
		Axios.get(`${API_URL}/users`, {
			params: {
				username,
			},
		})
			.then((result) => {
				if (result.data.length) {
					if (password === result.data[0].password) {
						delete result.data[0].password;
						localStorage.setItem(
							'userDataEmmerce' /*Key*/,
							JSON.stringify(
								result.data[0]
							) /* stringify= membuat item menjadi string berisi value */
						);

						dispatch({
							type: 'USER_LOGIN',
							payload: result.data[0],
						});
					} else {
						console.log(result.data[0].password);
						dispatch({
							type: 'USER_ERROR',
							payload: 'Wrong password',
						});
					}
				} else {
					dispatch({
						type: 'USER_ERROR',
						payload: 'User not found',
					});
				}
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di server`);
			});
	};
};

export const logoutUser = () => {
	localStorage.removeItem('userDataEmmerce');
	return {
		type: 'USER_LOGOUT',
	};
};

export const userKeepLogin = (userData) => {
	return (dispatch) => {
		Axios.get(`${API_URL}/users`, {
			params: { id: userData.id },
		})
			.then((result) => {
				delete result.data[0].password;
				localStorage.setItem(
					'userDataEmmerce' /*Key*/,
					JSON.stringify(
						result.data[0]
					) /* stringify= membuat item menjadi string berisi value */
				);

				dispatch({
					type: 'USER_LOGIN',
					payload: result.data[0],
				});
			})
			.catch(() => {
				alert('System error');
			});
	};
};

export const checkStorage = () => {
	return {
		type: 'CHECK_STORAGE',
	};
};
