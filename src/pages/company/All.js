import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class All extends Component {
	render() {
		return (
			<div>
				<Button
					color="primary"
					className={`float-right`}
					onClick={() => {
						this.props.history.push('company/add');
					}}
				>
					Add New +
				</Button>
				<div>company</div>
			</div>
		);
	}
}
