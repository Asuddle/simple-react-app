import React, { Component } from 'react';
import withRouter from 'react-router/withRouter';
import Table from '../../components/Table';
class All extends Component {
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
				<Table entity="Family" columns={columns} addRoute={'family/add'} buttonEntity="family" />
			</div>
		);
	}
}
export default withRouter(All);
