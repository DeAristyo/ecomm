import logo from './logo.svg';
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

class App extends React.Component{
  render() {
    return (
      <BrowserRouter>
      <MyNavbar/>
        <Switch>
          {/* <div>
            <h1>App JS</h1>
          </div> */}
          <Route component={Login} path='/login'/>
          <Route component={Register} path='/register'/>
          <Route component={Admin} path='/admin'/>
          <Route component={Cart} path='/cart'/>
          <Route component={History} path='/history'/>
          <Route component={ProductDetail} path='/productdetail'/>
          <Route component={Home} path='/'/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
