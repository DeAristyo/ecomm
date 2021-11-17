import React from 'react';
import Axios from 'axios';
import { API_URL } from '../constats/API';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../Assets/Styles/admin.css';

class Admin extends React.Component {
	state = {
		productList: [],
		addPrdctName: '',
		addPrdctPrice: '',
		addPrdctImage: '',
		addPrdctDescription: '',
		addPrdctcategory: '',

		edtId: 0,

		edtName: '',
		edtPrice: 0,
		edtImage: '',
		edtDesc: '',
		edtCategory: '',
	};

	fetchProduct = () => {
		Axios.get(`${API_URL}/products`)
			.then((result) => {
				this.setState({ productList: result.data });
			})
			.catch(() => {
				alert('Terjadi kesalahan pada system');
			});
	};

	editToggle = (edtData) => {
		this.setState({
			edtId: edtData.id,
			edtName: edtData.productName,
			edtPrice: edtData.price,
			edtImage: edtData.productImage,
			edtDesc: edtData.description,
			edtCategory: edtData.category,
		});
	};

	renderProducts = () => {
		return this.state.productList.map((val) => {
			if (val.id === this.state.edtId) {
				return (
					<tr>
						<td>{val.id}</td>
						<td>
							<input
								value={this.state.edtName}
								onChange={this.inputHandler}
								type="text"
								className="form-control"
								name="edtName"
							/>
						</td>
						<td>
							<input
								value={this.state.edtPrice}
								onChange={this.inputHandler}
								type="number"
								className="form-control"
								name="edtPrice"
							/>
						</td>
						<td>
							<input
								value={this.state.edtImage}
								onChange={this.inputHandler}
								type="text"
								className="form-control"
								name="edtImage"
							/>
						</td>
						<td>
							<input
								value={this.state.edtDesc}
								onChange={this.inputHandler}
								type="text"
								className="form-control"
								name="edtDesc"
							/>
						</td>
						<td>
							<select
								value={this.state.edtCategory}
								onChange={this.inputHandler}
								name="edtCategory"
								className="form-control"
							>
								<option value="">All Items</option>
								<option value="kaos">Kaos</option>
								<option value="celana">Celana</option>
								<option value="aksesoris">Aksesoris</option>
							</select>
						</td>
						<td>
							<button onClick={this.saveBtnHandler} className="btn btn-success">
								Save
							</button>
						</td>
						<td>
							<button onClick={this.cancleEdt} className="btn btn-danger">
								Cancel
							</button>
						</td>
					</tr>
				);
			}
			return (
				<tr>
					<td>{val.id}</td>
					<td>{val.productName}</td>
					<td>{val.price}</td>
					<td>
						<img src={val.productImage} className="admin-product-img" alt="" />
					</td>
					<td>{val.description}</td>
					<td>{val.category}</td>
					<td>
						<button
							onClick={() => this.editToggle(val)}
							className="btn btn-secondary"
						>
							Edit
						</button>
					</td>
					<td>
						<button
							onClick={() => this.deleteBtnHandler(val.id)}
							className="btn btn-danger"
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});
	};

	addNewProduct = () => {
		Axios.post(`${API_URL}/products`, {
			productName: this.state.addPrdctName,
			price: parseInt(this.state.addPrdctPrice),
			productImage: this.state.addPrdctImage,
			description: this.state.addPrdctDescription,
			category: this.state.addPrdctCategory,
		})
			.then(() => {
				this.fetchProduct();
				this.setState({
					addPrdctName: '',
					addPrdctPrice: '',
					addPrdctImage: '',
					addPrdctDescription: '',
					addPrdctcategory: '',
				});
			})
			.catch(() => {
				alert('Terjadi kesalahan di server');
			});
	};

	inputHandler = (e) => {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	};

	cancleEdt = () => {
		this.setState({ edtId: 0 });
	};

	saveBtnHandler = () => {
		Axios.patch(`${API_URL}/products/${this.state.edtId}`, {
			productName: this.state.edtName,
			price: parseInt(this.state.edtPrice),
			productImage: this.state.edtImage,
			description: this.state.edtDesc,
			category: this.state.edtCategory,
		})
			.then(() => {
				this.fetchProduct();
				this.cancleEdt();
			})
			.catch(() => {
				alert('Terjadi kesalahan pada system');
			});
	};

	deleteBtnHandler = (deleteid) => {
		const confirmDel = window.confirm('Did you wanna delete this?');
		if (confirmDel) {
			Axios.delete(`${API_URL}/products/${deleteid}`)
				.then(() => {
					this.fetchProduct();
				})
				.catch(() => {
					alert('Terjadi Kesalahan Pada System');
				});
		} else {
			alert('Delete Canceled');
		}
	};

	componentDidMount() {
		this.fetchProduct();
	}

	render() {
		if (this.props.userGlobal.role !== 'admin') {
			return <Redirect to="/" />;
		} else {
			return (
				<div className="p-5">
					<div className="row">
						<div className="col-12 text-center">
							<h1>Manage Products</h1>
							<table className="table mt-4">
								<thead className="thead-light">
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Price</th>
										<th>Image</th>
										<th>Description</th>
										<th>Category</th>
										<th colSpan="2">Action</th>
									</tr>
								</thead>
								<tbody>{this.renderProducts()}</tbody>
								<tfoot className="bg-light">
									<tr>
										<td></td>
										<td>
											<input
												value={this.state.addPrdctName}
												onChange={(e) => this.inputHandler(e)}
												name="addPrdctName"
												type="text"
												className="form-control"
											/>
										</td>
										<td>
											<input
												value={this.state.addPrdctPrice}
												onChange={(e) => this.inputHandler(e)}
												name="addPrdctPrice"
												type="number"
												className="form-control"
											/>
										</td>
										<td>
											<input
												value={this.state.addPrdctImage}
												onChange={(e) => this.inputHandler(e)}
												name="addPrdctImage"
												type="text"
												className="form-control"
											/>
										</td>
										<td>
											<input
												value={this.state.addPrdctDescription}
												onChange={(e) => this.inputHandler(e)}
												name="addPrdctDescription"
												type="text"
												className="form-control"
											/>
										</td>
										<td>
											<select
												onChange={(e) => this.inputHandler(e)}
												name="addPrdctCategory"
												className="form-control"
											>
												<option value="">All Items</option>
												<option value="kaos">Kaos</option>
												<option value="celana">Celana</option>
												<option value="aksesoris">Aksesoris</option>
											</select>
										</td>
										<td colSpan="2">
											<button
												onClick={this.addNewProduct}
												className="btn btn-info"
											>
												Add Product
											</button>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return { userGlobal: state.user };
};

export default connect(mapStateToProps)(Admin);
