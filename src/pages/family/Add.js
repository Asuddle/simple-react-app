import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
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
					console.log(data.data.data);
					this.setState({ ...data.data.data });
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
		console.log(this.state);
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
	render() {
		console.log('state', this.state);
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
				<Button color="success" onClick={this.handleSubmit}>
					Submit
				</Button>
			</Form>
		);
	}
}

export default withRouter(Add);
