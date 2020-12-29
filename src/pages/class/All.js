import React, { Component } from 'react';
import withRouter from 'react-router/withRouter';
import Table from '../../components/Table';
class All extends Component {
	render() {
		const columns = [
			{
				dataField: 'id',
				text: 'Product ID'
			},
			{
				dataField: 'name',
				text: 'Name'
			},
			{
				dataField: 'fromAge',
				text: 'From Age'
			},
			{
				dataField: 'toAge',
				text: 'To Age'
			},
			{
				dataField: 'capacity',
				text: 'capacity'
			}
		];

		return (
			<div>
				<Table buttonEntity="class" columns={columns} entity="Class" addRoute={`class/add`} />
			</div>
		);
	}
}
export default withRouter(All);
