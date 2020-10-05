import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
export default class Add extends Component {
	state = {
		company_name: '',
		address: '',
		centerName: '',
		name: '',
		phone: '',
		email: '',
		centerType: '',
		Logo: ''
	};
	render() {
		return (
			<Form>
				<Row form>
					<Col md={12}>
						<h5>Address</h5>
					</Col>
					<Col md={12}>
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
							<Label>Address Line 1</Label>
						</FormGroup>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
							<Label>Address Line 2</Label>
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
							<Label>City/District</Label>
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
							<Label>State/Province</Label>
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
							<Label>Postal Code</Label>
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
							<Label>Country</Label>
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
