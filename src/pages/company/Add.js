import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { withRouter } from 'react-router';
import country from '../../../src/country.js';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			companyName: '',
			address: {
				address1: '',
				address2: '',
				city: '',
				state: '',
				postalCode: '',
				country: ''
			},
			centerName: '',
			name: '',
			phone: '',
			email: '',
			centerType: '',
			logo: ''
		};
		this.method = 'post';
	}
	handleAddress = (e) => {
		let address = this.state.address;
		address[e.target.name] = e.target.value;
		this.setState({ address });
	};
	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'patch';
			getData(
				'get',
				`Company/${this.props.match.params.id}`,
				(data) => {
					this.setState({ ...data.data.data });
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
	handleSelect = (e) => {
		console.log(e.target);
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = () => {
		console.log(this.state);
		getData(
			this.method,
			this.method === 'patch' ? `Company/${this.props.match.params.id}` : 'Company',
			(data) => {
				this.props.history.push('/app/company');
			},
			(error) => {
				console.log(error);
			},
			JSON.stringify(this.state)
		);
	};
	handleFile = (e) => {
		console.log(e.target.files[0]);
	};
	render() {
		return (
			<Form>
				<Row form>
					<Col md={12}>
						<h5>Company Name</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="companyName"
								value={this.state.companyName}
								id="exampleEmail"
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={12}>
						<h5>Address</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="address1"
								value={this.state.address.address1}
								id="exampleEmail"
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
							<Label>Address Line 1</Label>
						</FormGroup>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="address2"
								value={this.state.address.address2}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
							<Label>Address Line 2</Label>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="city"
								value={this.state.address.city}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
							<Label>City/District</Label>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="state"
								value={this.state.address.state}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
							<Label>State/Province</Label>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="postalCode"
								value={this.state.address.postalCode}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
							<Label>Postal Code</Label>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input type="select" name="country" onChange={(e) => this.handleSelect(e)}>
								<option value="">Select Country</option>
								{country.map((item) => {
									return <option value={item.value}>{item.text}</option>;
								})}
							</Input>
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
						<h5>Email</h5>
					</Col>
					<Col md={12}>
						<FormGroup className={'customInputWidth'}>
							<Input
								type="text"
								value={this.state.email}
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
				<Button color="success" onClick={this.handleSubmit}>
					Submit
				</Button>
			</Form>
		);
	}
}
export default withRouter(Add);
