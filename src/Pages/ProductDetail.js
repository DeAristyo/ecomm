import React from 'react';
import Axios from 'axios';
import { API_URL } from '../constats/API';
import { connect } from 'react-redux';
import { getCartData } from '../Redux/actions/carts';

class ProductDetail extends React.Component {
	state = {
		productData: {},
		productNotFound: false,
		quantity: 0,
	};

	fetchProductData = () => {
		Axios.get(`${API_URL}/products`, {
			params: {
				id: this.props.match.params.idproduk,
			},
		})
			.then((result) => {
				if (result.data.length) {
					this.setState({ productData: result.data[0] });
				} else {
					this.setState({ productNotFound: true });
				}
			})
			.catch((err) => {
				alert('System error');
			});
	};

	qtyHandler = (action) => {
		if (action === 'incr') {
			this.setState({ quantity: this.state.quantity + 1 });
		} else if (action === 'decr' && this.state.quantity > 1) {
			this.setState({ quantity: this.state.quantity - 1 });
		}
	};

	toCartHandler = () => {
		Axios.get(`${API_URL}/carts`, {
			//check apakah barang udah ada di cart
			params: {
				userId: this.props.userGlobal.id,
				productId: this.state.productData.id,
			},
		}).then((result) => {
			if (result.data.length) {
				Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
					quantity: result.data[0].quantity + this.state.quantity,
				})
					.then(() => {
						alert('Added To Cart!');
						this.props.getCartData(this.props.userGlobal.id);
					})
					.catch(() => {
						alert('System Error');
					});
			} else {
				Axios.post(`${API_URL}/carts`, {
					userId: this.props.userGlobal.id,
					productId: this.state.productData.id,
					price: this.state.productData.price,
					productName: this.state.productData.productName,
					productImage: this.state.productData.productImage,
					quantity: this.state.quantity,
				})
					.then(() => {
						alert('Added To Cart!');
						this.props.getCartData(this.props.userGlobal.id);
					})
					.catch(() => {
						alert('System Error');
					});
			}
		});
	};

	componentDidMount() {
		this.fetchProductData();
	}

	render() {
		return (
			<div className="container">
				{this.state.productNotFound ? (
					<div className="alert alert-warning mt-3">
						PRODUCT WITH ID {this.props.match.params.idproduk} NOT FOUND
					</div>
				) : (
					<div className="row mt-3">
						<div className="col-6">
							<img
								style={{ width: '100%' }}
								src={this.state.productData.productImage}
								alt=""
							/>
						</div>
						<div className="col-6 d-flex flex-column justify-content-center">
							<h4>{this.state.productData.productName}</h4>
							<h5>Rp {this.state.productData.price}</h5>
							<p>{this.state.productData.description}</p>
							<div className="d-flex flex-row align-items-center">
								<button
									onClick={() => this.qtyHandler('decr')}
									className="btn btn-primary me-4"
								>
									-
								</button>
								{this.state.quantity}
								<button
									onClick={() => this.qtyHandler('incr')}
									className="btn btn-primary mx-4"
								>
									+
								</button>
							</div>
							<button
								onClick={this.toCartHandler}
								className="btn btn-success mt-3"
							>
								Add to cart
							</button>
						</div>
					</div>
				)}
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
	getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
