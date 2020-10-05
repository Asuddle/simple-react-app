import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import getData from '../../components/getData';
export default class Add extends Component {
	state = {
		firstName: '',
		lastName: '',
		relationship: '',
		phone: '',
		email: '',
		reporting: '',
		pin: ''
	};
	componentDidMount() {
		this.setState({ pin: Math.floor(1000 + Math.random() * 9000) });
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleRadio = (e) => {
		this.setState({ reporting: e.target.id });
	};
	handleSubmit = () => {
		console.log(this.state);
	};
	render() {
		return (
			<Form>
				<Row form>
					<Col md={12}>
						<h5>Full Name</h5>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="firstName"
								value={this.state.firstName}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
							<Label>First Name</Label>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
							<Label>Last Name</Label>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Phone</h5>
					</Col>
					<Col md={12}>
						<FormGroup className={'customInputWidth'}>
							<PhoneInput
								country={'us'}
								value={this.state.phone}
								onChange={(phone) => this.setState({ phone })}
							/>
						</FormGroup>
					</Col>
					<Col md={12}>
						<h5>Relationship</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input type="select" name="relationship" onChange={(e) => this.handleSelect(e)}>
								<option>Female</option>
								<option>male</option>
							</Input>
						</FormGroup>
					</Col>
					<Col md={12}>
						<h5>Date Of Birth</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="date"
								name="DOB"
								value={this.state.DOB}
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Email</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="email"
								name="email"
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={12}>
						<h5>Reporting Required</h5>
					</Col>
					<Col md={6}>
						<CustomInput type="radio" id="1" name="customRadio" label="yes" />
					</Col>
					<Col md={6}>
						<CustomInput type="radio" id="0" name="customRadio" label="no" />
					</Col>
				</Row>
				<br />
				<Row form>
					<Col md={12}>
						<h5>Auto Generated Pin (4 digit)</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="pin"
								value={this.state.pin}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Button onClick={this.handleSubmit}>Submit</Button>
			</Form>
		);
	}
}

// <div className="auth-page">
// {
/* <Widget
					className="widget-auth my-auto"
					title={
						<h3 className="mt-0 mb-2" style={{ fontSize: 40 }}>
							Login
						</h3>
					}
				>
					<form className="mt" onSubmit={this.doLogin}>
						{this.props.errorMessage && (
							<Alert className="alert-sm" color="danger">
								{this.props.errorMessage}
							</Alert>
						)}
						<div className="form-group">
							<Label for="search-input1">Username</Label>
							<input
								className="form-control"
								defaultValue={'admin'}
								onChange={this.changeEmail}
								required
								name="email"
								placeholder="Enter your username"
							/>
						</div>
						<div className="form-group mb-2">
							<Label for="search-input1">Password</Label>
							<input
								className="form-control"
								defaultValue={'123123'}
								onChange={this.changePassword}
								type="password"
								required
								name="password"
								placeholder="Enter your password"
							/>
						</div>
						<FormGroup className="checkbox abc-checkbox mb-4 d-flex" check>
							<Input id="checkbox1" type="checkbox" />
							<Label for="checkbox1" check className={'mr-auto'}>
								Remember me
							</Label>
							<a href="/">Forgot password?</a>
						</FormGroup>
						<Button type="submit" color="warning" className="auth-btn mb-3" size="sm">
							{this.props.isFetching ? 'Loading...' : 'Login'}
						</Button>
						<Link to="register" className={'ml-1'}>
							Sign Up here
						</Link>
					</form>
				</Widget>
			</div> */
