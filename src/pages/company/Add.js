import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
import { AvForm, AvField } from 'availity-reactstrap-validation';
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
					this.setState({ ...data.data });
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
	handleSelect = (e) => {
		let address = this.state.address;
		console.log(e.target.value);
		address['country'] = e.target.value;
		this.setState({ address: address });
	};
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = () => {
		console.log('here', this.state);
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
			<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
				<Row form>
					<Col md={12}>
						<h5>Company Name</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
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
							<AvField
								type="text"
								label="Address Line 1"
								name="address1"
								value={this.state.address.address1}
								id="exampleEmail"
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
								type="text"
								label="Address Line 2"
								name="address2"
								value={this.state.address.address2}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<AvField
								type="text"
								label="City/District"
								name="city"
								value={this.state.address.city}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<AvField
								type="text"
								label="State/Province"
								name="state"
								value={this.state.address.state}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<AvField
								type="text"
								label="Postal Code"
								name="postalCode"
								value={this.state.address.postalCode}
								onChange={(e) => {
									this.handleAddress(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<AvField
								label="Country"
								type="select"
								name="country"
								onChange={(e) => this.handleSelect(e)}
							>
								<option value="">Select Country</option>
								{country.map((item) => {
									return (
										<option key={item.text} value={item.value}>
											{item.text}
										</option>
									);
								})}
							</AvField>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Center Name</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
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
							<AvField
								type="text"
								label="First Name"
								name="firstName"
								value={this.state.firstName}
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<AvField
								type="text"
								label="Last Name"
								name="lastName"
								value={this.state.lastName}
								onChange={(e) => this.handleChange(e)}
							/>
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
							<AvField
								type="text"
								value={this.state.email}
								name="email"
								validate={{
									required: { value: true, errorMessage: 'Please enter Username' },
									email: { value: true, errorMessage: 'Please enter valid Email' }
								}}
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
							<AvField
								type="select"
								name="gender"
								onChange={(e) => this.setState({ centerType: e.target.value })}
							>
								<option>Female</option>
								<option>male</option>
							</AvField>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Centre Type</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField type="file" name="gender" onChange={(e) => this.handleFile(e)} />
						</FormGroup>
					</Col>
				</Row>
				<Button color="success">Submit</Button>
			</AvForm>
		);
	}
}
export default withRouter(Add);
