import React, { Component } from 'react';
import withRouter from 'react-router/withRouter';
import Table from '../../components/Table';
class All extends Component {
	render() {
		const products = [ { id: 1, name: 'abcd', price: '12' }, { id: 2, name: 'da', price: '12' } ];
		const columns = [
			{
				dataField: 'id',
				text: 'Id'
			},
			{
				dataField: 'user.userName',
				text: 'Username'
			},
			{
				dataField: 'user.email',
				text: 'Email'
			},
			{
				dataField: 'user.phoneNumber',
				text: 'Phone'
			},
			{
				dataField: 'relation',
				text: 'Relation'
			}
		];

		return (
			<div>
				<Table entity="Children" buttonEntity="children" columns={columns} addRoute="children/add" />
			</div>
		);
	}
}
export default withRouter(All);
