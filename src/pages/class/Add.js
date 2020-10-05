import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
export default class Add extends Component {
	state = {
		className: '',
		fromAge: '',
		toAge: '',
		capacity: ''
	};
	handleSubmit = () => {
		getData(
			'post',
			'Class',
			(data) => {
				console.log(data);
			},
			(error) => {
				console.log(error);
			},
			JSON.stringify(this.state)
		);
		console.log('state here', this.state);
	};
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Form>
				<Row form>
					<Col md={12}>
						<h5>Class Name</h5>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="classsName"
								value={this.state.className}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>From Age</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="fromAge"
								value={this.state.fromAge}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={12}>
						<h5>To Age</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="toAge"
								value={this.state.toAge}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<h5>Capacity</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="capacity"
								value={this.state.capacity}
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
