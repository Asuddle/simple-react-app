import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import Dashboard from '../../pages/dashboard';
// import Header from '../Header';
import Sidebar from '../Sidebar';
import { openSidebar, closeSidebar, toggleSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';
import BreadcrumbHistory from '../BreadcrumbHistory';

// pages
import Children from '../../pages/children/All';
import AddChildren from '../../pages/children/Add';

import Family from '../../pages/family/All';
import AddFamily from '../../pages/family/Add';

import Company from '../../pages/company/All';
import AddCompany from '../../pages/company/Add';

import Kiosk from '../../pages/kiosk/All';
import AddKiosk from '../../pages/kiosk/Add';

import Class from '../../pages/class/All';
import AddClass from '../../pages/class/Add';

import Staff from '../../pages/staff/All';
import AddStaff from '../../pages/staff/Add';

class Layout extends React.Component {
	static propTypes = {
		sidebarStatic: PropTypes.bool,
		sidebarOpened: PropTypes.bool,
		dispatch: PropTypes.func.isRequired
	};

	static defaultProps = {
		sidebarStatic: true,
		sidebarOpened: true
	};

	constructor(props) {
		super(props);

		this.handleSwipe = this.handleSwipe.bind(this);
		this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
	}

	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize.bind(this));
	}

	handleResize() {
		console.log(this.props);
		if (window.innerWidth <= 768) {
			this.props.toggleSidebar();
		} else if (window.innerWidth >= 768) {
			this.props.openSidebar();
		}
	}

	handleCloseSidebar(e) {
		if (e.target.closest('#sidebar-drawer') == null && this.props.sidebarOpened && window.innerWidth <= 768) {
			this.props.toggleSidebar();
		}
	}

	handleSwipe(e) {
		if ('ontouchstart' in window) {
			if (e.direction === 4) {
				this.props.openSidebar();
				return;
			}

			if (e.direction === 2 && this.props.sidebarOpened) {
				this.props.closeSidebar();
				return;
			}
		}
	}

	render() {
		return (
			<div
				className={[
					s.root,
					!this.props.sidebarOpened ? s.sidebarClose : '',
					'flatlogic-one',
					'dashboard-light'
				].join(' ')}
				onClick={(e) => this.handleCloseSidebar(e)}
			>
				<Sidebar />
				<div className={s.wrap}>
					{/* <Header /> */}

					<Hammer onSwipe={this.handleSwipe}>
						<main className={s.content}>
							<BreadcrumbHistory url={this.props.location.pathname} />
							<TransitionGroup>
								<CSSTransition key={this.props.location.key} classNames="fade" timeout={200}>
									<Switch>
										<Route path="/app" exact render={() => <Redirect to="/app/dashboard" />} />
										<Route path="/app/dashboard" exact component={Dashboard} exact />

										<Route path={'/app/children'} component={Children} exact />
										<Route path={'/app/children/add'} component={AddChildren} exact />
										<Route path={'/app/children/:id/edit'} component={AddChildren} exact />

										<Route path={'/app/family'} component={Family} exact />
										<Route path={'/app/family/add'} component={AddFamily} exact />
										<Route path={'/app/family/:id/edit'} component={AddFamily} exact />

										<Route path={'/app/company'} component={Company} exact />
										<Route path={'/app/company/add'} component={AddCompany} exact />
										<Route path={'/app/company/:id/edit'} component={AddCompany} exact />

										<Route path={'/app/kiosk'} component={Kiosk} exact />
										<Route path={'/app/kiosk/add'} component={AddKiosk} exact />
										<Route path={'/app/kiosk/:id/edit'} component={AddClass} exact />

										<Route path={'/app/class'} component={Class} exact />
										<Route path={'/app/class/add'} component={AddClass} exact />
										<Route path={'/app/class/:id/edit'} component={AddClass} exact />

										<Route path={'/app/staff'} component={Staff} exact />
										<Route path={'/app/staff/add'} component={AddStaff} exact />
										<Route path={'/app/staff/:id/edit'} component={AddStaff} exact />
									</Switch>
								</CSSTransition>
							</TransitionGroup>
						</main>
					</Hammer>
				</div>
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		sidebarOpened: store.navigation.sidebarOpened,
		sidebarStatic: store.navigation.sidebarStatic
	};
}

export default withRouter(connect(mapStateToProps, { openSidebar, closeSidebar, toggleSidebar })(Layout));
