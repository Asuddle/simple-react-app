import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastName: '',
			firstName: '',
			gender: '',
			DOB: '',
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
					this.setState({ ...data.data.data });
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
							<Input
								type="select"
								name="gender"
								value={this.state.gender}
								onChange={(e) => this.handleChange(e)}
							>
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
