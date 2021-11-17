import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/user';

class Login extends React.Component {
	state = {
		username: '',
		password: '',
	};

	inputHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		this.setState({ [name]: value });
	};

	render() {
		if (this.props.userGlobal.id) {
			return <Redirect to="/home" />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Log in Now!</h1>
						<p className="lead">
							Log in and start shopping in the most affordable ecommerce
							platform
						</p>
					</div>
				</div>
				<div className="row at-5">
					<div className="col-4 offset-4">
						{this.props.userGlobal.errMsg ? (
							<div className="alert alert-danger">
								{this.props.userGlobal.errMsg}
							</div>
						) : null}
						<div className="card">
							<div className="card-body">
								<h5 className="font-weight-bold mb-3">Log in</h5>
								<input
									name="username"
									onChange={(e) => this.inputHandler(e)}
									placeholder="Username"
									type="text"
									className="form-control my-2"
								/>
								<input
									name="password"
									onChange={this.inputHandler}
									placeholder="Password"
									type="password"
									className="form-control my-2"
								/>
								<div className="d-flex flex-row justify-content between align-items-center"></div>
								<button
									onClick={() => this.props.loginUser(this.state)}
									className="btn btn-primary mt-2"
								>
									Login
								</button>
								<Link to="/register">Or Register</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userGlobal: state.user,
	};
};

const mapDispatchToProps = {
	loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
