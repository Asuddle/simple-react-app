import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'reactstrap/lib/Button';
import withRouter from 'react-router/withRouter';
import getData from './getData';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			modal: false,
			deleteId: 0,
			columns: this.handleColumns()
		};
	}
	componentDidMount() {
		//get data from Api and populate in state
		getData(
			'get',
			this.props.entity,
			(data) => {
				console.log('in Table', data.data);
				this.setState({ data: data.data });
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
							{/* <Button color="success">Detail</Button> */}
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
				<Button
					color="success"
					// className="float-right"
					onClick={() => {
						this.props.history.push(this.props.addRoute);
					}}
				>
					Add New +
				</Button>
				<br />
				<br />
				<div className="custom-table-res">
					<BootstrapTable
						selectRow={{ mode: 'checkbox' }}
						striped
						hover
						responsive
						condensed
						keyField="id"
						data={this.state.data}
						columns={this.state.columns}
						defaultSorted="id"
					/>
				</div>
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
