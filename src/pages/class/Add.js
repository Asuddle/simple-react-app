import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getData from '../../components/getData';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			fromAge: '',
			toAge: '',
			capacity: '',
			description: ''
		};
		this.method = 'post';
	}
	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'patch';
			getData(
				'get',
				`Class/${this.props.match.params.id}`,
				(data) => {
					console.log('data', data);
					this.setState({ ...data.data });
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
	handleSubmit = () => {
		let data = { centerId: 0, description: 'string', name: 'dsadas' };
		console.log('data', data);
		getData(
			this.method,
			this.method === 'patch' ? `Class/${this.props.match.params.id}` : 'Class',
			(data) => {
				this.props.history.push('/app/class');
			},
			(error) => {
				console.log(error);
			},
			JSON.stringify(data)
		);
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
					<Col md={12}>
						<FormGroup>
							<Input
								type="text"
								name="name"
								value={this.state.name}
								onChange={(e) => {
									this.handleChange(e);
								}}
							/>
						</FormGroup>
					</Col>
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
					<Col md={12}>
						<h5>Description</h5>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Input
								type="textarea"
								name="description"
								value={this.state.description}
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
