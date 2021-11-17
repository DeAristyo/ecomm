import React from 'react';
import Axios from 'axios';
import { API_URL } from '../constats/API';
import { connect } from 'react-redux';

class History extends React.Component {
	state = {
		transactionList: [],
		transactionDetails: [],
	};

	fetchTransaction = () => {
		Axios.get(`${API_URL}/transaction`, {
			params: {
				userId: this.props.userGlobal.id,
			},
		})
			.then((result) => {
				console.log(result.data);
				this.setState({ transactionList: result.data });
			})
			.catch(() => {
				alert('System error');
			});
	};

	detBtnHandler = (transactionDetails) => {
		this.setState({ transactionDetails });
	};

	renderTransaction = () => {
		return this.state.transactionList.map((val) => {
			return (
				<tr>
					<td>{val.transactionDate}</td>
					<td>{val.transactionItems.length} Item(s)</td>
					<td>Rp {val.totalPrice}</td>
					<td>
						<button
							onClick={() => this.detBtnHandler(val.transactionItems)}
							className="btn btn-info"
						>
							See details
						</button>
					</td>
				</tr>
			);
		});
	};

    renderTransDetails = () => {
        return this.state.transactionDetails.map((val)=> {
            return <div className="d-flex my-2 flex-row justify-content-between align-items-center">
            <span className="fw-bold">{val.productName} ({val.quantity})</span>
            <span>Rp {val.price * val.quantity}</span>
        </div>
        })
    }

	componentDidMount() {
		this.fetchTransaction();
	}

	render() {
		return (
			<div>
				<h1>Transaction History</h1>
				<div className="row mt-5">
					<div className="col-8">
						<table className="table">
							<thead className="thead-light">
								<tr>
									<th>Transaction Data</th>
									<th>Total Items</th>
									<th>Total Price</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{this.renderTransaction()}</tbody>
						</table>
					</div>
					<div className="col-4">
                        {
                            this.state.transactionDetails.length ?
						<div className="card">
							<div className="card-header">
								<strong>Transaction Details</strong>
							</div>
							<div className="card-body">
								{this.renderTransDetails()}
							</div>
						</div>
                        : null
                        }
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

export default connect(mapStateToProps)(History);
