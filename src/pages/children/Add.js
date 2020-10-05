import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
export default class Add extends Component {
	state = {
		lastName: '',
		firstName: '',
		gender: '',
		DOB: '',
		notes: ''
	};
	handleSubmit = () => {
		getData(
			'post',
			'Children',
			(data) => {
				console.log(data);
			},
			(error) => {
				console.log(error);
			},
			JSON.stringify(this.state)
		);
		console.log('state', this.state);
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSelect = (e) => {
		console.log(e.target);
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
								id="exampleEmail"
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
						<h5>Gender</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input type="select" name="gender" onChange={(e) => this.handleSelect(e)}>
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
						<h5>Notes</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="textarea"
								name="notes"
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Button onClick={this.handleSubmit}>Submit</Button>
			</Form>
		);
	}
}
