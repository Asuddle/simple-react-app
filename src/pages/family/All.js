import React, { Component } from 'react';
import withRouter from 'react-router/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'reactstrap';
import getData from '../../components/getData';
class All extends Component {
	state = {
		data: []
	};
	componentDidMount() {
		getData(
			'get',
			'Family',
			(data) => {
				this.setState({ data: data.data });
			},
			(error) => {
				console.log('dasdasdsad', error);
			}
		);
	}
	handleAdd = () => {
		this.props.history.push('family/add');
	};

	render() {
		const products = [ { id: 1, name: 'abcd', price: '12' }, { id: 2, name: 'da', price: '12' } ];
		const columns = [
			{
				dataField: 'id',
				text: 'Product ID'
			},
			{
				dataField: 'email',
				text: 'Email'
			},
			{
				dataField: 'phone',
				text: 'Phone'
			},
			{
				dataField: 'Date Of Birth',
				text: 'dob'
			}
		];

		return (
			<div>
				<Button color="primary" className="float-right" onClick={this.handleAdd}>
					Add New +
				</Button>
				<br />
				<BootstrapTable
					selectRow={{ mode: 'checkbox' }}
					striped
					hover
					condensed
					keyField="id"
					data={this.state.data}
					columns={columns}
				/>
			</div>
		);
	}
}
export default withRouter(All);
