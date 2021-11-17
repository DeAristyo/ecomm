import React from 'react';
import '../Assets/Styles/product_card.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../constats/API';
import { getCartData } from '../Redux/actions/carts';

class ProductCard extends React.Component {
	toCartHandler = () => {
		Axios.get(`${API_URL}/carts`, {
			//check apakah barang udah ada di cart
			params: {
				userId: this.props.userGlobal.id,
				productId: this.props.productData.id,
			},
		}).then((result) => {
			if (result.data.length) {
				console.log(result.data[0]);
				Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
					quantity: result.data[0].quantity + 1,
				})
					.then(() => {
						alert('Added To Cart!');
						this.props.getCartData(this.props.userGlobal.id);
					})
					.catch(() => {
						alert('System Error');
					});
			} else {
				console.log(this.props.quantity);
				Axios.post(`${API_URL}/carts`, {
					userId: this.props.userGlobal.id,
					productId: this.props.productData.id,
					price: this.props.productData.price,
					productName: this.props.productData.productName,
					productImage: this.props.productData.productImage,
					quantity: 1,
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

	render() {
		return (
			<div className="card product-card">
				<img src={this.props.productData.productImage} alt="" />
				<div className="mt-2">
					<div>
						{/*
						localhost:5000/productdetail/{id barang}
						*/}
						<Link
							to={`/productdetail/${this.props.productData.id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<h6>{this.props.productData.productName}</h6>
						</Link>
						<span className="text-muted">
							Rp. {this.props.productData.price}
						</span>
					</div>
					<div className="d-flex flex-row justify-content-end">
						<button
							onClick={this.toCartHandler}
							className="btn btn-primary mt-2"
						>
							Add to cart
						</button>
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
	getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
