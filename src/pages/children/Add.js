import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Col, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import getData from '../../components/getData';
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
			classId: 0,
			familyId: 0,
			relation: '',
			entryDate: '',
			fileNo: '',
			// userName: '',
			// password: '',
			// lastName: '',
			// firstName: '',
			// gender: '',
			// dob: '',
			// notes: '',
			error: []
		};
		this.method = 'post';
	}

	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'patch';
			getData(
				'get',
				`Children/${this.props.match.params.id}`,
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
					// this.setState({ ...data.data });
				},
				(error) => {
					console.log(error);
				},
				JSON.stringify(this.state)
			);
		}
	}

	handleSubmit = () => {
		let data = this.state;
		delete data['error'];
		data['userId'] = '97b9dfd5-dd97-4ca7-980d-c0838659f3bb';
		getData(
			this.method,
			this.method === 'patch' ? `Children/${this.props.match.params.id}` : 'Children',
			(data) => {
				this.props.history.push('/app/Children');
			},
			(error) => {
				console.log(error.response.data);
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
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSelect = (e) => {
		console.log(e.target.value);
	};
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	setError = (data) => <Alert color="danger">{data}</Alert>;

	render() {
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
									value={this.state.userName}
									id="exampleEmail"
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
									value={this.state.password}
									id="exampleEmail"
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									label="First Name"
									type="text"
									name="firstName"
									value={this.state.firstName}
									id="exampleEmail"
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
						<Col md={12}>
							<FormGroup>
								<AvField
									type="select"
									name="gender"
									label="Gender"
									value={this.state.gender}
									onChange={(e) => this.handleChange(e)}
								>
									<option value="">Select</option>
									<option value="female">Female</option>
									<option value="male">male</option>
								</AvField>
							</FormGroup>
						</Col>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="date"
									name="dob"
									value={this.state.dob}
									label="Date Of Birth"
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<Label>Note</Label>
							<FormGroup>
								<AvField
									type="textarea"
									name="notes"
									value={this.state.notes}
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
