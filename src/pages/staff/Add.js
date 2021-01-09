import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import getData from '../../components/getData';
import AsyncSelect from 'react-select/async';
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
				phoneNumber: '',
				dob: '',
				email: '',
				pin: '',
				designation: '',
				note: '',
				classId: 0
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
				`Staff/${this.props.match.params.id}`,
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
						designation: dt.designation,
						classId: { value: dt.classId, label: dt.class.name },
						note: dt.note
					};
					this.setState({ form });
				},
				(error) => {
					let err = error.response.data;
					let arr = [];
					for (const key in err) {
						arr.push(err[key]);
					}

					this.setState({ error: arr });
				}
			);
		} else this.setState({ form: { ...this.state.form, pin: Math.floor(1000 + Math.random() * 9000) } });
	}
	handleChange = (e) => {
		this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
	};
	handleRadio = (e) => {
		this.setState({ form: { ...this.state.form, reporting: e.target.id } });
	};

	handleSubmit = () => {
		let data = this.state.form;
		data['classId'] = this.state.form.classId.hasOwnProperty('value') ? this.state.form.classId.value : '';
		for (const key in data) {
			if (data[key] === '' || data[key] === 0) {
				delete data[key];
			}
		}
		getData(
			this.method,
			this.method === 'put' ? `Staff/${this.props.match.params.id}` : 'Staff',
			(data) => {
				this.props.history.push('/app/staff');
			},
			(error) => {
				let err = error.response.data;
				let arr = [];
				for (const key in err) {
					arr.push(err[key]);
				}
				this.setState({ error: arr });
			},
			JSON.stringify(data)
		);
	};
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	loadOptions = async (inputValue, callback) => {
		await getData(
			'get',
			'Class',
			(data) => {
				let selectData = [];
				data.data.forEach((item) => {
					selectData.push({ value: item.id, label: item.name });
				});
				callback(selectData);
			},
			(error) => {
				console.log(error);
			}
		);
	};
	render() {
		const {
			userName,
			password,
			lastName,
			firstName,
			phoneNumber,
			dob,
			email,
			pin,
			designation,
			note,
			classId
		} = this.state.form;
		return (
			<div>
				{Array.isArray(this.state.error) &&
					this.state.error.length > 0 &&
					this.state.error.map((item) => <Alert color="danger">{item}</Alert>)}
				<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<AvField
									label="User Name"
									type="text"
									name="userName"
									validate={{
										required: { value: true, errorMessage: 'Please enter Username' }
									}}
									value={userName}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
								{/* <Label>User Name</Label> */}
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<AvField
									label="Password"
									type="password"
									name="password"
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
									label="First Name"
									name="firstName"
									value={firstName}
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
									name="lastName"
									value={lastName}
									validate={{
										required: { value: true, errorMessage: 'Please enter Last Name' }
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
									label="Email"
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
							<FormGroup className={'customInputWidth'}>
								<AvField
									type="date"
									label="Date of Birth"
									value={dob}
									name="dob"
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									label="Designation"
									type="text"
									name="designation"
									value={designation}
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
							<AvField
								type="text"
								name="pin"
								label="Auto Generated Pin (4 digit)"
								value={pin}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</Col>
						<Col md={6}>
							<Label>Class</Label>
							<AsyncSelect
								cacheOptions
								defaultOptions
								value={classId}
								loadOptions={this.loadOptions}
								onChange={(e) => {
									this.setState({ form: { ...this.state.form, classId: e } });
								}}
							/>
						</Col>
						<Col md={12}>
							<h5>Notes</h5>
						</Col>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="textarea"
									name="note"
									value={note}
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
