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
				dataField: 'dob',
				text: 'Date of Birth'
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
			{
				dataField: 'pin',
				text: 'Pin'
			}
		];

		return (
			<div>
				<Table buttonEntity="staff" columns={columns} entity="Staff" addRoute={`staff/add`} />
			</div>
		);
	}
}
