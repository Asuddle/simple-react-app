import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'reactstrap/lib/Button';
import withRouter from 'react-router/withRouter';
import axios from 'axios';
// import api from '../../components/api';
import getData from '../../components/getData';
class All extends Component {
	state = { data: [] };
	componentDidMount() {
		getData(
			'get',
			'Children',
			(data) => {
				this.setState({ data: data.data });
			},
			(error) => {
				console.log('dasdasdsad', error);
			}
		);
	}
	handleAdd = () => {
		this.props.history.push('class/add');
	};
	render() {
		const products = [ { id: 1, name: 'abcd', price: '12' }, { id: 2, name: 'da', price: '12' } ];
		const columns = [
			{
				dataField: 'id',
				text: 'Product ID'
			},
			{
				dataField: 'classNAme',
				text: 'Class Name'
			},
			{
				dataField: 'from',
				text: 'From Age'
			},
			{
				dataField: 'to',
				text: 'To Age'
			},
			{
				dataField: 'Capacity',
				text: 'capacity'
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
