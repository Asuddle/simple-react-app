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
				dataField: 'firstName',
				text: 'First Name'
			},
			{
				dataField: 'lastName',
				text: 'LastName'
			}
			// ,
			// {
			// 	dataField: 'price',
			// 	text: 'Age'
			// },
			// {
			// 	dataField: 'class',
			// 	text: 'Class'
			// },
			// {
			// 	dataField: 'class',
			// 	text: 'In/Out'
			// }
		];

		return (
			<div>
				<Table entity="Children" buttonEntity="children" columns={columns} addRoute="children/add" />
			</div>
		);
	}
}
export default withRouter(All);
