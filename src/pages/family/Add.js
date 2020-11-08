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
			firstName: '',
			lastName: '',
			relationship: '',
			phone: '',
			email: '',
			reporting: '',
			pin: ''
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
					this.setState({ ...data.data });
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
		return (
			<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
				<Row form>
					<Col md={12}>
						<h5>Full Name</h5>
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
							<AvField type="select" name="relationship" onChange={(e) => this.handleSelect(e)}>
								<option>Female</option>
								<option>male</option>
							</AvField>
						</FormGroup>
					</Col>
					<Col md={12}>
						<h5>Date Of Birth</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
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
