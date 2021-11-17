import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../constats/API';
import { getCartData } from '../Redux/actions/carts';

class Cart extends React.Component {
	state = {
		isCheckout: false,
		recipientName: '',
		address: '',
		payment: 0,
	};

	dltCartHandler = (cartId) => {
		Axios.delete(`${API_URL}/carts/${cartId}`)
			.then(() => {
				alert('Item deleted from cart');
				this.props.getCartData(this.props.userGlobal.id);
			})
			.catch(() => {
				alert('Terjadi kesalahan di server');
			});
	};

	renderCart = () => {
		return this.props.cartGlobal.cartList.map((val) => {
			return (
				<tr>
					<td className="align-middle">{val.productName}</td>
					<td className="align-middle">{val.price}</td>
					<td className="align-middle">
						<img style={{ height: '150px' }} src={val.productImage} alt="" />
					</td>
					<td className="align-middle">{val.quantity}</td>
					<td className="align-middle">{val.quantity * val.price}</td>
					<td className="align-middle">
						<button
							onClick={() => this.dltCartHandler(val.id)}
							className="btn btn-danger"
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});
	};

	rndrSubtotal = () => {
		let subtotal = 0;
		for (let i = 0; i < this.props.cartGlobal.cartList.length; i++) {
			subtotal +=
				this.props.cartGlobal.cartList[i].price *
				this.props.cartGlobal.cartList[i].quantity;
		}
		console.log(subtotal);
		return subtotal;
	};

	rndrTax = () => {
		return this.rndrSubtotal() * 0.05;
	};

	rndrTotal = () => {
		return this.rndrSubtotal() + this.rndrTax();
	};

	checkoutMode = () => {
		this.setState({ isCheckout: !this.state.isCheckout });
	};

	inputHndler = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	payBtnHndler = () => {
		if (this.state.payment < this.rndrTotal()) {
			alert(
				`The amount of balance entered is not enough, need ${
					this.state.payment - this.rndrTotal()
				} more.`
			);
			return;
		}

		if (this.state.payment === this.rndrTotal()) {
			alert('Thank you');
		} else if (this.state.payment > this.rndrTotal()) {
			alert(
				`Payment Success there's change left ${
					this.state.payment - this.rndrTotal()
				}`
			);
		}

		const d = new Date();
		Axios.post(`${API_URL}/transaction`, {
			userId: this.props.userGlobal.id,
			address: this.state.address,
			recipientName: this.state.recipientName,
			totalPrice: parseInt(this.rndrTotal()),
			totalPayment: parseInt(this.state.payment),
			transactionDate: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
			transactionItems: this.props.cartGlobal.cartList,
		})
			.then((result) => {
				result.data.transactionItems.forEach((val) => {
					this.dltCartHandler(val.id);
				});
			})
			.catch((err) => {
				alert('System Error');
			});
	};

	render() {
		return (
			<div className="p-5 text-center">
				<h1>Cart</h1>
				<div className="row mt-5">
					<div className="col-9 text-center">
						<table className="table">
							<thead className="thead-light">
								<tr>
									<th>Name</th>
									<th>Price</th>
									<th>Image</th>
									<th>Quantity</th>
									<th>Total Price</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{this.renderCart()}</tbody>
							<tfoot className="bg-light">
								<tr>
									<td colSpan="6">
										<button
											onClick={this.checkoutMode}
											className="btn btn-success"
										>
											Checkout
										</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
					{this.state.isCheckout ? (
						<div className="col-3">
							{/* Form checkout */}
							<div className="card text-start">
								<div className="card-header">
									<strong>Order Summmary</strong>
								</div>
								<div className="card-body">
									<div className="d-flex my-2 flex-row justify-content-between align-items-center">
										<span className="fw-bold">Subtotal Price</span>
										<span>Rp {this.rndrSubtotal()}</span>
									</div>
									<div className="d-flex my-2 flex-row justify-content-between align-items-center">
										<span className="fw-bold">Tax Fee (5%)</span>
										<span>Rp {this.rndrTax()}</span>
									</div>
									<div className="d-flex my-2 flex-row justify-content-between align-items-center">
										<span className="fw-bold">Total Price</span>
										<span>Rp {this.rndrTotal()}</span>
									</div>
								</div>
								<div className="card-body border-top">
									<label htmlFor="recipientName">Recipient Name</label>
									<input
										onChange={this.inputHndler}
										type="text"
										className="form-control mb-4"
										name="recipientName"
									/>
									<label htmlFor="address">Address</label>
									<input
										onChange={this.inputHndler}
										type="text"
										className="form-control"
										name="address"
									/>
								</div>
								<div className="card-footer">
									<div className="d-flex flex-row justify-content-between align-items-center">
										<input
											onChange={this.inputHndler}
											name="payment"
											className="from-control mx-1"
											type="number"
										/>
										<button
											onClick={this.payBtnHndler}
											className="btn btn-success mx-1"
										>
											Pay
										</button>
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartGlobal: state.cart,
		userGlobal: state.user,
	};
};

const mapDispatchToProps = {
	getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
