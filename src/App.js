import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Admin from './Pages/Admin';
import Cart from './Pages/Cart';
import History from './Pages/History';
import ProductDetail from './Pages/ProductDetail';
import MyNavbar from './Components/myNavBar';

import { connect } from 'react-redux';
import { userKeepLogin, checkStorage } from './Redux/actions/user';
import { getCartData } from './Redux/actions/carts';

class App extends React.Component {
	componentDidMount() {
		const userLocalStorage = localStorage.getItem('userDataEmmerce');

		if (userLocalStorage) {
			const userData = JSON.parse(userLocalStorage); //JSON.parse adalah method untuk mengubah string (stringify) kembali menjadi method
			this.props.userKeepLogin(userData);
			this.props.getCartData(userData.id)
		} else {
			this.props.checkStorage();
		}
	}

	render() {
		if (this.props.userGlobal.storageIsChecked) {
			return (
				<BrowserRouter>
					<MyNavbar />
					<Switch>
						{/* <div>
				<h1>App JS</h1>
			  </div> */}
						<Route component={Login} path="/login" />
						<Route component={Register} path="/register" />
						<Route component={Admin} path="/admin" />
						<Route component={Cart} path="/cart" />
						<Route component={History} path="/history" />
						<Route component={ProductDetail} path="/productdetail/:idproduk" />
						<Route component={Home} path="/" />
					</Switch>
				</BrowserRouter>
			);
		}

		return <div>LOADING . . .</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		userGlobal: state.user,
	};
};

const mapDispatchToProps = {
	userKeepLogin,
	checkStorage,
	getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
