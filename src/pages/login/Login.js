import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Row, Button, Label, Input, FormGroup, Form, Col, Card, Container } from 'reactstrap';
// import Widget from '../../components/Widget';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import { loginUser } from '../../actions/user';
import axios from 'axios';

class Login extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired
	};

	static isAuthenticated(token) {
		if (token) return true;
	}

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.doLogin = this.doLogin.bind(this);
		this.signUp = this.signUp.bind(this);
	}
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	doLogin(e) {
		e.preventDefault();
		this.props.dispatch(loginUser({ username: this.state.username, password: this.state.password }));
	}

	signUp() {
		this.props.history.push('/register');
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();

		let header = {
			'Content-Type': 'application/json-patch+json',
			'Access-Control-Allow-Origin': '*'
		};

		// localStorage.setItem('authenticated', 'asdasasasasdasdasdasd');
		toast.success('Authenticated');
		this.props.history.push('app/dashboard');
		axios
			.post('http://kndlgs.com/api/auth/login', JSON.stringify(this.state), { headers: header })
			.then((response) => {
				console.log(response);
				localStorage.setItem('authenticated', response.data.token);
				toast.success('Authenticated');
				this.props.history.push('app/dashboard');
			})
			.catch((error) => {
				console.log('=======', JSON.stringify(error.message));
				toast.error(error.message);
				// console.log('erro', error);
			});
	};

	render() {
		toast.configure();
		const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line
		if (localStorage.getItem('authenticated')) {
			return <Redirect to={from} />;
		}
		// cant access login page while logged in
		// if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
		// 	return <Redirect to={from} />;
		// }

		return (
			<div>
				<br />
				<br />
				<br />
				<Row>
					<Col md={3} />
					<Col md={6}>
						<Card>
							<Container className="App">
								<h2 style={{ textAlign: 'center' }}>
									<strong>Login</strong>
								</h2>
								<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
									<Col>
										<FormGroup>
											<Label>
												<strong>User Name</strong>
											</Label>
											<AvField
												type="text"
												validate={{
													required: { value: true, errorMessage: 'Please enter Username' },
													email: { value: true, errorMessage: 'Please enter valid Email' }
												}}
												// validate={{ email: true, errorMessage: 'Please enter valid Email' }}
												name="username"
												value={this.state.username}
												onChange={(e) => this.handleChange(e)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="examplePassword">
												<strong>Password</strong>
											</Label>
											<AvField
												type="password"
												name="password"
												validate={{
													required: { value: true, errorMessage: 'Please enter Password' }
												}}
												value={this.state.password}
												onChange={(e) => this.handleChange(e)}
											/>
										</FormGroup>
									</Col>
									<Button>Submit</Button>
									<br />
									<br />
								</AvForm>
							</Container>
						</Card>
					</Col>
					<Col md={3} />
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isFetching: state.auth.isFetching,
		isAuthenticated: state.auth.isAuthenticated,
		errorMessage: state.auth.errorMessage
	};
}

export default withRouter(connect(mapStateToProps)(Login));
