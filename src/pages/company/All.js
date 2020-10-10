import React, { Component } from 'react';
import Table from '../../components/Table';
export default class All extends Component {
	render() {
		const columns = [
			{
				dataField: 'id',
				text: 'Product ID'
			},
			{
				dataField: 'companyName',
				text: 'Company Name'
			},
			{
				dataField: 'name',
				text: 'Name',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return (
						<span>
							{row.firstName} {row.lastName}
						</span>
					);
				}
			},
			// {
			// 	dataField: 'address',
			// 	text: 'Address'
			// },
			{
				dataField: 'email',
				text: 'Email'
			}
		];

		return (
			<div>
				<Table buttonEntity="company" columns={columns} entity="Company" addRoute={`company/add`} />
			</div>
		);
	}
}
