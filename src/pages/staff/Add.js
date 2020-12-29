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
			phoneNumber: '',
			dob: '',
			email: '',
			pin: '',
			designation: '',
			note: '',
			classId: 0
		};
		this.method = 'post';
	}
	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'patch';
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
						classId: dt.classId,
						note: dt.note
					};
					this.setState({ ...form });
				},
				(error) => {
					console.log(error);
				}
			);
		} else this.setState({ pin: Math.floor(1000 + Math.random() * 9000) });
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleRadio = (e) => {
		this.setState({ reporting: e.target.id });
	};
	handleSubmit = () => {
		getData(
			this.method,
			this.method === 'patch' ? `Staff/${this.props.match.params.id}` : 'Staff',
			(data) => {
				this.props.history.push('/app/staff');
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
		return (
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
								value={this.state.userName}
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
								name="firstName"
								value={this.state.firstName}
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
								value={this.state.lastName}
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
								value={this.state.email}
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
								value={this.state.dob}
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
								value={this.state.designation}
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
						<AvField
							type="text"
							name="pin"
							label="Auto Generated Pin (4 digit)"
							value={this.state.pin}
							onChange={(e) => {
								this.handleChange(e);
							}}
						/>
					</Col>
					<Col md={6}>
						<AvField
							type="number"
							name="classId"
							label="Class"
							value={this.state.classId}
							onChange={(e) => {
								this.handleChange(e);
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
								value={this.state.note}
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
// onClick={this.handleSubmit}
export default withRouter(Add);

{
	/* <Col md={12}>
						<h5>Class Room Dropdown </h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
								type="select"
								name="classRoom"
								value={this.state.classRoom}
								onChange={(e) => this.handleChange(e)}
							>
								<option value="">Select</option>
								{[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map((item) => {
									return (
										<option key={item} value={item}>
											{item}
										</option>
									);
								})}
							</AvField>
						</FormGroup>
					</Col>
					<Col md={12}>
						<h5>Position Dropdown </h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
								type="select"
								name="position"
								value={this.state.position}
								onChange={(e) => this.handleChange(e)}
							>
								<option value="">Select</option>
								{[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map((item) => {
									return (
										<option key={item} value={item}>
											{item}
										</option>
									);
								})}
							</AvField>
						</FormGroup>
					</Col> */
}
