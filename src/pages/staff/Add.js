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
			dob: '',
			classRoom: '',
			position: '',
			notes: '',
			pin: ''
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
	render() {
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
						<h5>Date Of Birth</h5>
					</Col>
					<Col md={12}>
						<FormGroup className={'customInputWidth'}>
							<Input
								type="date"
								value={this.state.dob}
								name="dob"
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Class Room Dropdown </h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="select"
								name="classRoom"
								value={this.state.classRoom}
								onChange={(e) => this.handleChange(e)}
							>
								<option value="">Select</option>
								{[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map((item) => {
									return <option value={item}>{item}</option>;
								})}
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Position Dropdown </h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="select"
								name="position"
								value={this.state.position}
								onChange={(e) => this.handleChange(e)}
							>
								<option value="">Select</option>
								{[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map((item) => {
									return <option value={item}>{item}</option>;
								})}
							</Input>
						</FormGroup>
					</Col>
				</Row>
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
				<Row form>
					<Col md={12}>
						<h5>Notes</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
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
				<Button color="success" onClick={this.handleSubmit}>
					Submit
				</Button>
			</Form>
		);
	}
}

export default withRouter(Add);
