import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Alert, Button, Label, FormGroup, Input, Row, Col, Card, CardHeader, CardBody, Toast } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import getData from '../../components/getData';
import axios from 'axios';
import { toast } from 'react-toastify';

class Register extends React.Component {
	state = {
		username: '',
		email: '',
		PhoneNumber: '',
		Phone: '',
		password: '',
		RoleIds: '',
		LastName: '',
		FirstName: '',
		Age: '',
		Gender: '',
		CNIC: '',
		City: '',
		Province: '',
		Photo: '',
		DeviceId: ''
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = () => {
		let data = {};
		for (const key in this.state) {
			if (this.state[key] !== '') {
				data[key] = this.state[key];
			}
		}
		let header = {
			'Content-Type': 'application/json-patch+json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
			//'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version': true
		};

		console.log(data);
		axios
			.post('http://kndlgs.com/api/auth/regsiter', JSON.stringify(data), { headers: header })
			.then((response) => {
				console.log(response);
				toast.success('Authenticated');
				this.props.history.push('/login');
			})
			.catch((error) => {
				console.log('=======', JSON.stringify(error.message));
				toast.error(error.message);
				// console.log('erro', error);
			});
	};

	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	render() {
		return (
			<Row>
				<Col md={2} />
				<Col md={8}>
					<br />
					<br />
					<Card>
						<CardHeader>
							<strong>Register</strong>
							<Button
								color="primary"
								className="float-right"
								onClick={() => this.props.history.push('/login')}
							>
								Login
							</Button>
						</CardHeader>
						<CardBody>
							<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
								<Row>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="User Name"
												type="text"
												name="username"
												validate={{
													required: { value: true, errorMessage: 'Please enter Username' }
												}}
												value={this.state.username}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
											{/* <Label>User Name</Label> */}
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="Email"
												type="email"
												name="email"
												validate={{
													required: { value: true, errorMessage: 'Please enter Password' }
												}}
												value={this.state.email}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="Password"
												type="password"
												name="password"
												validate={{
													required: { value: true, errorMessage: 'Please enter Password' }
												}}
												value={this.state.password}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												type="text"
												label="First Name"
												name="FirstName"
												value={this.state.FirstName}
												validate={{
													required: { value: true, errorMessage: 'Please Enter First Name' }
												}}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="Last Name"
												type="text"
												name="LastName"
												value={this.state.LastName}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup className={'customInputWidth'}>
											<AvField
												label="Phone"
												type="text"
												value={this.state.Phone}
												name="Phone"
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="Phone Number"
												type="text"
												name="PhoneNumber"
												value={this.state.PhoneNumber}
												onChange={(e) => this.handleChange(e)}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="City"
												type="text"
												name="Province"
												value={this.state.City}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="Province"
												type="text"
												name="Province"
												value={this.state.Province}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<AvField
												label="Age"
												type="number"
												name="Age"
												value={this.state.Age}
												onChange={(e) => {
													this.handleChange(e);
												}}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Button color="success">Submit</Button>
							</AvForm>
						</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default withRouter(Register);
