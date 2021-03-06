import React from 'react';
import ProductCard from '../Components/productCard';
import Axios from 'axios';
import { API_URL } from '../constats/API';

class Home extends React.Component {
	state = {
		productList: [],
		filterProductList: [],
		page: 1,
		maxPage: 0,
		itemPerPage: 6,
		searchProductName: '',
		searchCategory: '',
		sortBy: '',
	};

	fetchProducts = () => {
		Axios.get(`${API_URL}/products`)
			.then((result) => {
				this.setState({
					productList: result.data,
					maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
					filterProductList: result.data,
				});
			})
			.catch(() => {
				alert('Terjadi kesalahan pada fetch product');
			});
	};

	renderProducts = () => {
		const startingIndex = (this.state.page - 1) * this.state.itemPerPage; //0
		let rawData = [...this.state.filterProductList];

		const compareString = (a, b) => {
			if (a.productName < b.productName) {
				return -1;
			}

			if (a.productName > b.productName) {
				return 1;
			}

			return 0;
		};

		switch (this.state.sortBy) {
			case 'lowPrice':
				rawData.sort((a, b) => a.price - b.price);
				break;
			case 'hiPrice':
				rawData.sort((a, b) => b.price - a.price);
				break;
			case 'az':
				rawData.sort(compareString);
				break;
			case 'za':
				rawData.sort((a, b) => compareString(b, a));
				break;
			default:
				rawData = [...this.state.filterProductList];
				break;
		}

		const currentPage = rawData.slice(
			startingIndex,
			startingIndex + this.state.itemPerPage
		);
		return currentPage.map((val) => {
			return <ProductCard productData={val} />;
		});
	};

	componentDidMount() {
		this.fetchProducts();
	}

	nextPageHandler = () => {
		if (this.state.page !== this.state.maxPage) {
			this.setState({ page: this.state.page + 1 });
		}
	};

	prevPageHandler = () => {
		if (this.state.page > 1) {
			this.setState({ page: this.state.page - 1 });
		}
	};

	inputHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({ [name]: value });
	};

	searchBtnHandler = () => {
		const filterProductList = this.state.productList.filter((val) => {
			return (
				val.productName
					.toLowerCase()
					.includes(this.state.searchProductName.toLowerCase()) &&
				val.category
					.toLowerCase()
					.includes(this.state.searchCategory.toLowerCase())
			);
		});

		this.setState({
			filterProductList,
			maxPage: Math.ceil(filterProductList.length / this.state.itemPerPage),
			page: 1,
		});
	};

	render() {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-3">
						<div className="card">
							<div className="card-header">
								<strong>Filter Products</strong>
							</div>
							<div className="card-body">
								<label htmlFor="searchProductName">Product Name</label>
								<input
									onChange={(e) => this.inputHandler(e)}
									name="searchProductName"
									type="text"
									className="form-control mb-3"
								/>
								<label htmlFor="searchCategory">Product Category</label>
								<select
									onChange={(e) => this.inputHandler(e)}
									name="searchCategory"
									className="form-control"
								>
									<option value="">All Items</option>
									<option value="kaos">Kaos</option>
									<option value="celana">Celana</option>
									<option value="aksesoris">Aksesoris</option>
								</select>
								<button
									onClick={this.searchBtnHandler}
									className="btn btn-primary mt-3"
								>
									Search
								</button>
							</div>
						</div>
						<div className="card mt-4">
							<div className="card-header">
								<strong>Sort Products</strong>
							</div>
							<div className="card-body">
								<label htmlFor="sortBy">Sort by</label>
								<select
									onChange={(e) => this.inputHandler(e)}
									name="sortBy"
									className="form-control"
								>
									<option value="">Default</option>
									<option value="lowPrice">Lowest Price</option>
									<option value="hiPrice">Highest Price</option>
									<option value="az">A-Z</option>
									<option value="za">Z-A</option>
								</select>
							</div>
						</div>
						<div className="mt-3">
							<div className="d-flex flex-row justify-content-between align-items-center">
								<button
									disabled={this.state.page === 1}
									onClick={this.prevPageHandler}
									className="btn btn-dark"
								>
									{'<'}
								</button>
								<div className="text-center">
									Page {this.state.page} of {this.state.maxPage}
								</div>
								<button
									disabled={this.state.page === this.state.maxPage}
									onClick={this.nextPageHandler}
									className="btn btn-dark"
								>
									{'>'}
								</button>
							</div>
						</div>
					</div>
					<div className="col-9">
						<div className="d-flex flex-wrap flex-row">
							{/* Render Products Here */}
							{this.renderProducts()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
