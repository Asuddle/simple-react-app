import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import getData from '../../components/getData';
import { withRouter } from 'react-router';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				userName: '',
				password: '',
				lastName: '',
				firstName: '',
				dob: '',
				occupation: '',
				isReporting: false,
				phoneNumber: '',
				relationship: '',
				gender: '',
				email: '',
				pin: '',
				centerId: 5
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
				`Family/${this.props.match.params.id}`,
				(data) => {
					let dt = data.data;
					let form = {
						userName: dt.user.userName,
						password: dt.user.passwordHash,
						lastName: dt.user.lastName,
						firstName: dt.user.firstName,
						gender: dt.user.gender,
						isReporting: dt.isReporting,
						phoneNumber: dt.user.phoneNumber,
						dob: dt.user.dob.split('T')[0],
						email: dt.user.email,
						pin: dt.pin,
						designation: dt.designation
					};
					this.setState({ form });
				},
				(error) => {
					console.log(error);
				}
			);
		} else this.setState({ form: { ...this.state.form, pin: Math.floor(1000 + Math.random() * 9000) } });
	}
	handleSelect = (e) => {
		this.setState({ relationship: e.target.value });
	};
	handleChange = (e) => {
		this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
	};
	handleSubmit = () => {
		let data = this.state.form;
		for (const key in data) {
			if (data[key] === '' || data[key] === 0) {
				delete data[key];
			}
		}
		getData(
			this.method,
			this.method === 'put' ? `Family/${this.props.match.params.id}` : 'Family',
			(data) => {
				this.props.history.push('/app/family');
			},
			(error) => {
				let err = error.response.data;
				let arr = [];
				for (const key in err) {
					arr.push(err[key]);
				}

				this.setState({ error: arr });
			},
			JSON.stringify({ ...data, ...{ centerId: 1 } })
		);
	};
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	render() {
		const {
			userName,
			password,
			lastName,
			firstName,
			gender,
			isReporting,
			phoneNumber,
			dob,
			email,
			pin,
			designation
		} = this.state.form;
		return (
			<div>
				{Array.isArray(this.state.error) &&
					this.state.error.length > 0 &&
					this.state.error.map((item) => <Alert color="danger">{item}</Alert>)}
				<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="text"
									name="UserName"
									label="User Name"
									value={userName}
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
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
									type="password"
									name="password"
									label="Password"
									validate={
										this.props.match.params.id ? (
											{}
										) : (
											{
												required: { value: true, errorMessage: 'Password is required' },
												minLength: { value: 8, errorMessage: 'Password is  greater than 8' }
											}
										)
									}
									value={password}
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
									value={firstName}
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
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
									type="text"
									name="lastName"
									label="Last Name"
									value={lastName}
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
									}}
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
									value={phoneNumber}
									onChange={(phoneNumber) =>
										this.setState({ form: { ...this.state.form, phoneNumber: phoneNumber } })}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label>Gender</Label>
								<AvField
									type="select"
									name="gender"
									value={gender}
									onChange={(e) => this.handleChange(e)}
								>
									<option>Female</option>
									<option>male</option>
								</AvField>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label>Date Of Birth</Label>
								<AvField type="date" name="dob" value={dob} onChange={(e) => this.handleChange(e)} />
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label>Email</Label>
								<AvField
									type="email"
									name="email"
									value={email}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>

						<Col md={6}>
							<Label>Reporting Required</Label>
							<br />
							<Toggle
								defaultChecked={isReporting}
								checked={isReporting}
								value={isReporting}
								id="cheese-status"
								onChange={(event) => {
									this.setState({ form: { ...this.state.form, isReporting: event.target.checked } });
								}}
							/>
							<br />
						</Col>

						<Col md={6}>
							<Label>Auto Generated Pin (4 digit)</Label>
							<FormGroup>
								<AvField
									type="text"
									name="pin"
									value={pin}
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
