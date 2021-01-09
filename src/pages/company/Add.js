import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Alert } from 'reactstrap';
import getData from '../../components/getData';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { withRouter } from 'react-router';
import country from '../../../src/country.js';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				name: '',
				photo: '',
				centerType: 0,
				phone: '',
				email: '',
				address: ''
			},
			error: []
			// companyName: '',
			// address: {
			// 	address1: '',
			// 	address2: '',
			// 	city: '',
			// 	state: '',
			// 	postalCode: '',
			// 	country: ''
			// },
			// centerName: '',
			// name: '',
			// phone: '',
			// email: '',
			// centerType: '',
			// logo: ''
		};
		this.method = 'post';
	}
	handleAddress = (e) => {
		let address = this.state.address;
		address[e.target.name] = e.target.value;
		this.setState({ address });
	};
	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'put';
			getData(
				'get',
				`Center/${this.props.match.params.id}`,
				(data) => {
					let dt = data.data;
					console.log(data.data);
					let form = {
						name: dt.name,
						photo: dt.photo,
						centerType: dt.centerType,
						phone: dt.phone,
						email: dt.email,
						address: dt.address
					};
					this.setState({ form });
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
	handleImage = async (element) => {
		let img = element.target.files[0];
		console.log(img);
		const base64 = await this.convertBase64(img);
		this.setState({ form: { ...this.state.form, photo: base64 } });
		// this.getBase64(element, (result) => {
		// 	console.log(result);
		// });
		// var file = element.files[0];
		// var reader = new FileReader();
		// reader.onloadend = function() {
		// console.log('RESULT', reader.result);
		//   reader.readAsDataURL(file);
		// };
	};
	convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};
	handleSelect = (e) => {
		let address = this.state.address;
		console.log(e.target.value);
		address['country'] = e.target.value;
		this.setState({ address: address });
	};
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	handleChange = (e) => {
		this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
	};
	handleSubmit = () => {
		let data = this.state.form;
		for (const key in data) {
			if (data[key] === '' || data[key] === 0) {
				delete data[key];
			}
		}
		getData(
			this.method,
			this.method === 'put' ? `Center/${this.props.match.params.id}` : 'Center',
			(data) => {
				this.props.history.push('/app/company');
			},
			(error) => {
				let err = error.response.data;
				let arr = [];
				for (const key in err) {
					arr.push(err[key]);
				}
				this.setState({ error: arr });
			},
			JSON.stringify(data)
		);
	};
	handleFile = (e) => {
		console.log(e.target.files[0]);
	};
	render() {
		const { name, photo, centerType, phone, email, address } = this.state.form;
		return (
			<div>
				{Array.isArray(this.state.error) &&
					this.state.error.length > 0 &&
					this.state.error.map((item) => <Alert color="danger">{item}</Alert>)}
				<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
					<Row form>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="text"
									label="Name"
									name="name"
									value={name}
									validate={{
										required: { value: true, errorMessage: 'Please enter Name' }
									}}
									id="exampleEmail"
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<FormGroup>
								<AvField
									type="number"
									label="Center Type"
									name="centerType"
									value={centerType}
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="text"
									label="Phone"
									name="phone"
									value={phone}
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="email"
									label="Email"
									name="email"
									validate={{
										required: { value: true, errorMessage: 'Please enter Email' },
										email: { value: true, errorMessage: 'Please enter valid Email' }
									}}
									value={email}
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<FormGroup className={'customInputWidth'}>
								<AvField
									type="text"
									label="Address"
									validate={{
										required: { value: true, errorMessage: 'Please enter Address' }
									}}
									value={address}
									name="address"
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="file"
									label="Photo"
									name="photo"
									// value={photo}
									onChange={this.handleImage}
								/>
								{this.state.form.photo && <img src={this.state.form.photo} alt="image" width="100" />}
							</FormGroup>
						</Col>
					</Row>

					<Button color="success">Submit</Button>
				</AvForm>
			</div>
		);
	}
}
export default withRouter(Add);
