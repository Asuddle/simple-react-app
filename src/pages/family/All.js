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
				dataField: 'email',
				text: 'Email',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return <p>{row.user.email}</p>;
				}
			},
			{
				dataField: 'phone',
				text: 'Phone',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return <p>{row.user.phoneNumber}</p>;
				}
			},
			{
				dataField: 'name',
				text: 'Name',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return (
						<p>
							{row.user.firstName} {row.user.lastName}
						</p>
					);
				}
			},
			{
				dataField: 'Date Of Birth',
				text: 'dob',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return <p>{row.user.dob}</p>;
				}
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
