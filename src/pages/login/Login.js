import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Row, Button, Label, Input, FormGroup, Form, Col, Card, Container } from 'reactstrap';
// import Widget from '../../components/Widget';
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
		console.log('dasdsa');
		let header = {
			'Content-Type': 'application/json-patch+json'
			// 'Access-Control-Allow-Origin': '*'
		};
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
		if (JSON.parse(localStorage.getItem('authenticated'))) {
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
								<Form className="form" onSubmit={this.handleSubmit}>
									<Col>
										<FormGroup>
											<Label>
												<strong>username</strong>
											</Label>
											<Input
												type="text"
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
											<Input
												type="password"
												name="password"
												value={this.state.password}
												onChange={(e) => this.handleChange(e)}
											/>
										</FormGroup>
									</Col>
									<Button>Submit</Button>
									<br />
									<br />
								</Form>
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
