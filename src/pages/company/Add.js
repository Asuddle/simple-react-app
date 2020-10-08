import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
export default class Add extends Component {
	state = {
		company_name: '',
		address: '',
		centerName: '',
		name: '',
		phone: '',
		email: '',
		centerType: '',
		Logo: ''
	};
	handleSelect = (e) => {
		console.log(e.target);
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleFile = (e) => {
		console.log(e.target.files[0]);
	};
	render() {
		return (
			<Form>
				<Row form>
					<Col md={12}>
						<h5>Address</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="firstName"
								value={this.state.firstName}
								id="exampleEmail"
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
							<Label>Address Line 1</Label>
						</FormGroup>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
							<Label>Address Line 2</Label>
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
							<Label>City/District</Label>
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
							<Label>State/Province</Label>
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
							<Label>Postal Code</Label>
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
							<Label>Country</Label>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Center Name</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="centerName"
								value={this.state.centerName}
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
					<Col md={12}>
						<h5>Name</h5>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="firstName"
								value={this.state.firstName}
								onChange={(e) => this.handleChange(e)}
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
								onChange={(e) => this.handleChange(e)}
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
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Centre Type</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input type="select" name="gender" onChange={(e) => this.handleSelect(e)}>
								<option>Female</option>
								<option>male</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Centre Type</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input type="file" name="gender" onChange={(e) => this.handleFile(e)} />
						</FormGroup>
					</Col>
				</Row>
				<Button onClick={this.handleSubmit}>Submit</Button>
			</Form>
		);
	}
}
