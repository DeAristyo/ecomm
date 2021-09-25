import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {API_URL} from '../../constats/API';
import { registerUser } from '../../Redux/actions/user';
import { connect } from 'react-redux';


class Register extends React.Component {

    state ={
        fullname: "",
        username: "",
        email: "",
        password: "",
    };

    inputHandler =(event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value});
    };

    registerHandler = () => {
        // alert(`fullname: ${this.state.fullname}\n username: ${this.state.username}\n email: ${this.state.email}\n password: ${this.state.password} `)
        const { fullname, username, email, password } = this.state; //destructure code dengan langsung memanggil key dalam object state untuk kemudian dituliskan di kode dibawah
        Axios.post(`${API_URL}/users`, {
            fullname, //Karena field dan valuenya sama dapat langsung ditulis dengan 1 code supaya lebih clean daripada menulis (fullname(field): fullname(value))
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Register Now!</h1>
                        <p className="lead">
                            Register now and start shopping in the most affordable ecommerce
                            platform
                        </p>
                    </div>
                </div>
                <div className="row at-5">
                    <div className="col-4 offset-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="font-weight-bold mb-3">Register</h5>
                                <input name="fullname" onChange={this.inputHandler} placeholder="Full Name" type="text" className="form-control my-2" />
                                <input name="username" onChange={this.inputHandler} placeholder="Username" type="text" className="form-control my-2" />
                                <input name="email" onChange={this.inputHandler} placeholder="Email" type="text" className="form-control my-2" />
                                <input name="password" onChange={this.inputHandler} placeholder="Password" type="password" className="form-control my-2" />
                                <div className="d-flex flex-row justify-content between align-items-center"></div>
                                <button onClick={()=> this.props.registerUSer(this.state)} className="btn btn-primary mt-2">
                                    Register
                                </button>
                                <Link to="/login">Or Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);