import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Col, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import getData from '../../components/getData';
import AsyncSelect from 'react-select/async';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				userName: '',
				password: '',
				lastName: '',
				firstName: '',
				phoneNumber: '',
				dob: '',
				classId: 0,
				familyId: 0,
				relation: '',
				entryDate: '',
				fileNo: ''
			},
			error: []
		};
		this.method = 'post';
	}

	componentDidMount() {
		if (typeof this.props.match.params.id !== 'undefined') {
			this.method = 'put';
			getData(
				'get',
				`Children/${this.props.match.params.id}`,
				(data) => {
					let dt = data.data;
					let form = {
						userName: dt.user.userName,
						password: dt.user.passwordHash,
						classId: dt.classId,
						familyId: dt.familyId,
						lastName: dt.user.lastName,
						entryDate: dt.entryDate.split('T')[0],
						relation: dt.relation,
						firstName: dt.user.firstName,
						fileNo:dt.fileNo,
						phoneNumber: dt.user.phoneNumber,
						dob: dt.user.dob.split('T')[0],
						email: dt.user.email,
						pin: dt.pin,
						designation: dt.designation
					};
					this.setState({ form });
				},
				(error) => {
					console.log(error);
				},
				JSON.stringify(this.state)
			);
		}
	}

	handleSubmit = () => {
		let data = this.state.form;
		data['classId'] = this.state.form.classId.hasOwnProperty('value') ? this.state.form.classId.value : '';
		data['familyId'] = this.state.form.familyId.hasOwnProperty('value') ? this.state.form.familyId.value : '';
		for (const key in data) {
			if (data[key] === '' || data[key] === 0) {
				delete data[key];
			}
		}
		getData(
			this.method,
			this.method === 'put' ? `Children/${this.props.match.params.id}` : 'Children',
			(data) => {
				this.props.history.push('/app/Children');
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
	loadClassOptions = async (inputValue, callback) => {
		await getData(
			'get',
			'Class',
			(data) => {
				let selectData = [];
				setTimeout(() => {
					data.data.forEach((item) => {
						if (this.state.form.classId) {
							if (item.id === this.state.form.classId) {
								this.setState({
									form: { ...this.state.form, classId: { value: item.id, label: item.name } }
								});
							}
						}
						selectData.push({ value: item.id, label: item.name });
					});
					callback(selectData);
				}, 2000);
			},
			(error) => {
				console.log(error);
			}
		);
	};
	loadFamilyOption = async (inputValue, callback) => {
		await getData(
			'get',
			'Family',
			(data) => {
				setTimeout(() => {
					let selectData = [];
					data.data.forEach((item) => {
						if (item.id === this.state.form.familyId) {
							this.setState({
								form: { ...this.state.form, familyId: { value: item.id, label: item.user.userName } }
							});
						}
						selectData.push({ value: item.id, label: item.user.userName });
					});
					callback(selectData);
				}, 2000);
			},
			(error) => {
				console.log(error);
			}
		);
	};
	handleChange = (e) => {
		this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
		// this.setState({ [e.target.name]: e.target.value });
	};
	handleSelect = (e) => {
		console.log(e.target.value);
	};
	handleInvalidSubmit = (e, values) => {
		console.log('valeuss', values);
	};
	setError = (data) => <Alert color="danger">{data}</Alert>;

	render() {
		const {
			userName,
			password,
			classId,
			familyId,
			lastName,
			relation,
			firstName,
			phoneNumber,
			dob,
			gender,
			notes,
			entryDate,
			email,
			pin,
			fileNo,
			designation
		} = this.state.form;
		const relationDropDown=['Brother','Sister','Father','Mother','Uncle','Aunt','Grand Father','Grand Mother']
		return (
			<div>
				{Array.isArray(this.state.error) &&
					this.state.error.length > 0 &&
					this.state.error.map((item) => <Alert color="danger">{item}</Alert>)}
				<AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<AvField
									label="User Name"
									type="text"
									name="userName"
									value={userName}
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
									value={password}
									id="exampleEmail"
									validate={
										this.props.match.params.id ? (
											{}
										) : (
											{
												required: { value: true, errorMessage: 'Password is required' },
												minLength: { value: 8, errorMessage: 'Password is  greater than 8' }
											}
										)
									}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									label="First Name"
									type="text"
									name="firstName"
									value={firstName}
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
									}}
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
									value={lastName}
									validate={{
										required: { value: true, errorMessage: 'Field is required' }
									}}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="select"
									name="gender"
									label="Gender"
									value={gender}
									onChange={(e) => this.handleChange(e)}
								>
									<option value="">Select</option>
									<option value="female">Female</option>
									<option value="male">male</option>
								</AvField>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="date"
									name="dob"
									value={dob}
									label="Date Of Birth"
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="date"
									name="entryDate"
									value={entryDate}
									label="Entry Date"
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									type="text"
									name="phoneNumber"
									value={phoneNumber}
									label="Phone Number"
									onChange={(e) => this.handleChange(e)}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<AvField
									label="FileNumber"
									type="text"
									name="fileNo"
									value={fileNo}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col>
						
						<Col md={6}>
							<FormGroup>
								<AvField
									label="Relation"
									type="select"
									name="relation"
									value={relation}
									onChange={(e) => {
										this.handleChange(e);
									}}
								>
									<option value=''>Select</option>
									{relationDropDown.map(item=>(<option value={item}>{item}</option>))}	
									</AvField>
								{/* <AvField
									type="select"
									name="gender"
									label="Gender"
									value={gender}
									onChange={(e) => this.handleChange(e)}
								>
									<option value="">Select</option>
									<option value="female">Female</option>
									<option value="male">male</option>
								</AvField> */}
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label>Class</Label>
								<AsyncSelect
									cacheOptions
									defaultOptions
									value={classId}
									loadOptions={this.loadClassOptions}
									onChange={(e) => {
										this.setState({ form: { ...this.state.form, classId: e } });
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label>Family</Label>
								<AsyncSelect
									cacheOptions
									defaultOptions
									value={familyId}
									loadOptions={this.loadFamilyOption}
									onChange={(e) => {
										this.setState({ form: { ...this.state.form, familyId: e } });
									}}
								/>
							</FormGroup>
						</Col>
						{/* <Col md={12}>
							<Label>Note</Label>
							<FormGroup>
								<AvField
									type="textarea"
									name="notes"
									value={notes}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</FormGroup>
						</Col> */}
					</Row>
					<Button color="success">Submit</Button>
				</AvForm>
			</div>
		);
	}
}
export default withRouter(Add);
