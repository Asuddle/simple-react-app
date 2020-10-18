import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			lastName: '',
			firstName: '',
			gender: '',
			dob: '',
			notes: ''
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
					this.setState({ ...data.data });
				},
				(error) => {
					console.log(error);
				},
				JSON.stringify(this.state)
			);
		}
	}
	handleSubmit = () => {
		getData(
			this.method,
			this.method === 'patch' ? `Children/${this.props.match.params.id}` : 'Children',
			// 'Children',
			(data) => {
				this.props.history.push('/app/Children');
			},
			(error) => {
				console.log(error);
			},
			JSON.stringify(this.state)
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
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Full Name</h5>
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
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Gender</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
								type="select"
								name="gender"
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
						<h5>Date Of Birth</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<AvField
								type="date"
								name="dob"
								value={this.state.dob}
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Notes</h5>
					</Col>
					<Col md={12}>
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
		);
	}
}
export default withRouter(Add);
