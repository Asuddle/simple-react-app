import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'reactstrap/lib/Button';
import withRouter from 'react-router/withRouter';
import getData from './getData';
import { Card, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			modal: false,
			deleteId: 0,
			loader: true,
			columns: this.handleColumns()
		};
	}
	componentDidMount() {
		getData(
			'get',
			this.props.entity,
			(data) => {
				this.setState({ loader: false, data: data.data });
			},
			(error) => {
				console.log('error', error);
			}
		);
	}
	handleModal = () => {
		this.setState({ modal: !this.state.modal });
	};
	handleEdit = (row) => {
		this.props.history.push(`${this.props.buttonEntity}/${row.id}/edit`);
	};
	handleDelete = () => {
		let allData = this.state.data;
		allData = allData.filter((item) => item.id !== this.state.deleteId);
		getData(
			'delete',
			`${this.props.entity}/${this.state.deleteId}`,
			(data) => {
				console.log(data);
			},
			(error) => {
				console.log('error', error);
			}
		);
		this.setState({ data: allData });
		this.handleModal();
	};
	handleColumns = () => {
		let column = [ ...this.props.columns ];
		let buttons = [
			{
				dataField: 'action',
				text: 'Actions',
				formatter: (cell, row, rowIndex, formatExtraData) => {
					return (
						<React.Fragment>
							<Button color="primary" onClick={() => this.handleEdit(row)}>
								Edit
							</Button>{' '}
							<Button
								color="danger"
								onClick={() => {
									this.setState({ deleteId: row.id, modal: !this.state.modal });
								}}
							>
								Delete
							</Button>{' '}
						</React.Fragment>
					);
				}
			}
		];
		column.push(...buttons);
		return column;
	};
	render() {
		return (
			<div>
				{!this.state.loader ? (
					<div className="custom-table-res">
						<Card>
							<CardHeader>
								<Button
									color="success"
									// className="float-right"
									onClick={() => {
										this.props.history.push(this.props.addRoute);
									}}
								>
									Add New +
								</Button>
							</CardHeader>
							<CardBody>
								<BootstrapTable
									// selectRow={{ mode: 'checkbox' }}
									// striped
									hover
									responsive
									// condensed
									keyField="id"
									data={this.state.data}
									columns={this.state.columns}
									defaultSorted={[
										{
											dataField: 'id', // if dataField is not match to any column you defined, it will be ignored.
											order: 'desc' // desc or asc
										}
									]}
									pagination={paginationFactory()}
								/>
							</CardBody>
						</Card>
					</div>
				) : (
					<div className="text-center">
						<Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
					</div>
				)}
				<Modal isOpen={this.state.modal} toggle={this.handleModal}>
					<ModalHeader toggle={this.handleModal}>Delete</ModalHeader>
					<ModalBody>Are you sure you want to delete this item?</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={this.handleDelete}>
							Delete
						</Button>{' '}
						<Button color="secondary" onClick={this.handleModal}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default withRouter(Table);
