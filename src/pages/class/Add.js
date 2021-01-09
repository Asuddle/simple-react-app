import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Col, Row, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

import getData from '../../components/getData';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				name: '',
				fromAge: '',
				toAge: '',
				capacity: '',
				description: ''
			},
			error: []
		};
		this.method = 'post';
	}
	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'put';
			getData(
				'get',
				`Class/${this.props.match.params.id}`,
				(data) => {
					let dt = data.data;
					this.setState({
						form: {
							name: dt.name,
							fromAge: dt.fromAge,
							toAge: dt.toAge,
							capacity: dt.capacity,
							description: dt.description
						}
					});
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
	handleSubmit = () => {
		getData(
			this.method,
			this.method === 'put' ? `Class/${this.props.match.params.id}` : 'Class',
			(data) => {
				this.props.history.push('/app/class');
			},
			(error) => {
				let err = error.response.data;
				let arr = [];
				for (const key in err) {
					arr.push(err[key]);
				}
				this.setState({ error: arr });
			},
			JSON.stringify({ ...this.state.form, ...{ centerId: 1 } })
		);
	};
	handleChange = (e) => {
		this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
	};
	handleInvalidSubmit = (e) => {
		console.log(e);
	};
	render() {
		const { name, fromAge, toAge, capacity, description } = this.state.form;
		return (
			<div>
				{Array.isArray(this.state.error) &&
					this.state.error.length > 0 &&
					this.state.error.map((item) => <Alert color="danger">{item}</Alert>)}
				<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
					<Row form>
						<Col md={12}>
							<h5>Class Name</h5>
						</Col>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="text"
									name="name"
									value={name}
									validate={{
										required: { value: true, errorMessage: 'Field is required' },
										minLength: { value: 3, errorMessage: 'Name should  greater than 3' }
									}}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<h5>From Age</h5>
						</Col>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="number"
									name="fromAge"
									value={fromAge}
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
									}}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<h5>To Age</h5>
						</Col>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="number"
									name="toAge"
									value={toAge}
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
									}}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<h5>Capacity</h5>
						</Col>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="number"
									name="capacity"
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
									}}
									value={capacity}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<h5>Description</h5>
						</Col>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="textarea"
									name="description"
									value={description}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Button color="success">Submit</Button>
				</AvForm>
			</div>
		);
	}
}
export default withRouter(Add);
