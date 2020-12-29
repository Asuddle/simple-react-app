import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import getData from '../../components/getData';
import { withRouter } from 'react-router';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			lastName: '',
			firstName: '',
			dob: '',
			occupation: '',
			isReporting: false,
			phoneNumber: '',
			email: '',
			pin: '',
			centerId: 5
		};
		this.method = 'post';
	}
	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'patch';
			getData(
				'get',
				`Family/${this.props.match.params.id}`,
				(data) => {
					let dt = data.data;
					let form = {
						userName: dt.user.userName,
						password: '',
						lastName: dt.user.lastName,
						firstName: dt.user.firstName,
						phoneNumber: dt.user.phoneNumber,
						dob: dt.user.dob.split('T')[0],
						email: dt.user.email,
						pin: dt.pin,
						designation: dt.designation
					};
					this.setState({ ...form });
				},
				(error) => {
					console.log(error);
				}
			);
		} else this.setState({ pin: Math.floor(1000 + Math.random() * 9000) });
	}
	handleSelect = (e) => {
		console.log(e.target);
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleRadio = (e) => {
		this.setState({ reporting: e.target.id });
	};
	handleSubmit = () => {
		getData(
			this.method,
			this.method === 'patch' ? `Family/${this.props.match.params.id}` : 'Family',
			(data) => {
				this.props.history.push('/app/family');
			},
			(error) => {
				console.log(error);
			},
			JSON.stringify(this.state)
		);
	};
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	render() {
		console.log(this.state.isReporting);
		return (
			<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<AvField
								type="text"
								name="UserName"
								label="User Name"
								value={this.state.userName}
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
								name="password"
								label="Password"
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
								name="firstName"
								label="First Name"
								value={this.state.firstName}
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
								name="lastName"
								label="Last Name"
								value={this.state.lastName}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup className={'customInputWidth'}>
							<Label>Phone Number</Label>
							<PhoneInput
								country={'us'}
								value={this.state.phoneNumber}
								onChange={(phoneNumber) => this.setState({ phoneNumber })}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Relationship</Label>
							<AvField type="select" name="relationship" onChange={(e) => this.handleSelect(e)}>
								<option>Female</option>
								<option>male</option>
							</AvField>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Date Of Birth</Label>
							<AvField
								type="date"
								name="dob"
								value={this.state.dob}
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Email</Label>
							<AvField
								type="email"
								name="email"
								value={this.state.email}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>

					<Col md={6}>
						<Label>Reporting Required</Label>
						<CustomInput
							type="switch"
							bsSize="lg"
							id="isReporting"
							value={this.state.isReporting}
							name="isReporting"
							onChange={(e) => {
								this.setState({ isReporting: !this.state.isReporting });
							}}
						/>
						<br />
						{/* <CustomInput type="radio" id="1" name="customRadio" label="yes" /> */}
					</Col>

					<Col md={6}>
						<Label>Auto Generated Pin (4 digit)</Label>
						<FormGroup>
							<AvField
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
				<Button color="success">Submit</Button>
			</AvForm>
		);
	}
}

export default withRouter(Add);
