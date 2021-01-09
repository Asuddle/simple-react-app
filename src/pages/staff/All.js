import React, { Component } from 'react';
import Table from '../../components/Table';
export default class All extends Component {
	render() {
		const columns = [
			{
				dataField: 'id',
				text: 'Id'
			},
			{
				dataField: 'class.name',
				text: 'Class'
			},
			{
				dataField: 'designation',
				text: 'Designation'
			},

			{
				dataField: 'user',
				text: 'Name',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return (
						<span>
							{cell.firstName} {cell.lastName}
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
