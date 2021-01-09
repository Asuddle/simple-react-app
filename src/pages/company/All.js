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
				dataField: 'photo',
				text: 'Photo',
				formatter: (cell, row, rowIndex, formatExtraData) => <img src={cell} width="50" />
			},
			{
				dataField: 'name',
				text: 'Name'
			},
			{
				dataField: 'phone',
				text: 'Phone'
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
				<Table buttonEntity="company" columns={columns} entity="Center" addRoute={`company/add`} />
			</div>
		);
	}
}
