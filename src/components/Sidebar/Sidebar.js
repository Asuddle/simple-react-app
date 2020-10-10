import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dismissAlert } from '../../actions/alerts';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';
import { changeActiveSidebarItem } from '../../actions/navigation';
import { logoutUser } from '../../actions/user';

import lightDashboardIcon from '../../images/light-dashboard.svg';
import darkDashboardIcon from '../../images/dark-dashboard.svg';
import lightTables from '../../images/tables.svg';
import darkTables from '../../images/tables-dark.svg';
import lightUI from '../../images/ui-elements.svg';
import darkUI from '../../images/ui-elements-dark.svg';
import lightTypography from '../../images/Typography.svg';
import darkTypography from '../../images/Typography-dark.svg';
import logo from '../../images/logo.svg';
import settingsIcon from '../../images/settings.svg';
import logoutIcon from '../../images/logout.svg';
import accountIcon from '../../images/account.svg';
import stockIcon from '../../images/stocks.svg';
import orderIcon from '../../images/orders.svg';

class Sidebar extends React.Component {
	static propTypes = {
		sidebarStatic: PropTypes.bool,
		sidebarOpened: PropTypes.bool,
		dispatch: PropTypes.func.isRequired,
		activeItem: PropTypes.string,
		location: PropTypes.shape({
			pathname: PropTypes.string
		}).isRequired
	};

	static defaultProps = {
		sidebarStatic: true,
		sidebarOpened: true,
		activeItem: ''
	};

	constructor(props) {
		super(props);

		this.doLogout = this.doLogout.bind(this);
	}

	dismissAlert(id) {
		this.props.dispatch(dismissAlert(id));
	}

	doLogout() {
		this.props.dispatch(logoutUser());
	}

	render() {
		return (
			<div
				className={`${!this.props.sidebarOpened && !this.props.sidebarStatic
					? s.sidebarClose
					: ''} ${s.sidebarWrapper}`}
				id={'sidebar-drawer'}
			>
				<nav className={s.root}>
					<header className={s.logo}>KndLogs</header>
					<ul className={s.nav}>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							activeItem={this.props.activeItem}
							header="Dashboard"
							isHeader
							link="/app/dashboard"
							index="main"
						>
							{window.location.href.includes('dashboard') ? (
								<img src={darkDashboardIcon} alt="lightDashboard" width={'24px'} height={'24px'} />
							) : (
								<img src={lightDashboardIcon} alt="lightDashboard" width={'24px'} height={'24px'} />
							)}
						</LinksGroup>
					</ul>
					<hr />
					<ul className={s.nav}>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							activeItem={this.props.activeItem}
							header="Children"
							isHeader
							link="/app/children"
							index="main"
						>
							{window.location.href.includes('typography') ? (
								<img src={darkTypography} alt="lightDashboard" width={'24px'} height={'24px'} />
							) : (
								<img src={lightTypography} alt="lightDashboard" width={'24px'} height={'24px'} />
							)}
						</LinksGroup>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							activeItem={this.props.activeItem}
							header="Family"
							isHeader
							link="/app/family"
							index="main"
						>
							{window.location.href.includes('tables') ? (
								<img src={darkTables} alt="lightDashboard" width={'24px'} height={'24px'} />
							) : (
								<img src={lightTables} alt="lightDashboard" width={'24px'} height={'24px'} />
							)}
						</LinksGroup>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							activeItem={this.props.activeItem}
							header="Company"
							isHeader
							link="/app/company"
							index="app"
							exact={false}
							// 	childrenLinks={[
							// 		{
							// 			header: 'Children',
							// 			link: '/app/children'
							// 		},
							// 		{
							// 			header: 'Family',
							// 			link: '/app/family'
							// 		},
							// 		{
							// 			header: 'Company',
							// 			link: '/app/company'
							// 		},
							// 		{
							// 			header: 'Class',
							// 			link: '/app/class'
							// 		},
							// 		{
							// 			header: 'Staff',
							// 			link: '/app/staff'
							// 		},
							// 		{
							// 			header: 'Kiosk',
							// 			link: '/app/kiosk'
							// 		}
							// 	]}
						>
							{window.location.href.includes('ui') ? (
								<img src={darkUI} alt="lightDashboard" width={'24px'} height={'24px'} />
							) : (
								<img src={lightUI} alt="lightDashboard" width={'24px'} height={'24px'} />
							)}
						</LinksGroup>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							header="Class"
							isHeader
							link="/app/class"
							index="app"
						>
							<img src={settingsIcon} alt="lightDashboard" width={'24px'} height={'24px'} />
						</LinksGroup>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							header="Staff"
							isHeader
							link="/app/staff"
							index="app"
						>
							<img src={accountIcon} alt="lightDashboard" width={'24px'} height={'24px'} />
						</LinksGroup>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							header="Kiosk"
							isHeader
							link="/app/kiosk"
							index="app"
						>
							<img src={orderIcon} alt="lightDashboard" width={'24px'} height={'24px'} />
						</LinksGroup>
					</ul>
					<hr />
					<ul className={s.downNav}>
						<LinksGroup
							onActiveSidebarItemChange={(activeItem) =>
								this.props.dispatch(changeActiveSidebarItem(activeItem))}
							header="Logout"
							isHeader
							onClick={() => this.doLogout()}
						>
							{window.location.href.includes('another-page') ? (
								<img src={logoutIcon} alt="lightDashboard" width={'24px'} height={'24px'} />
							) : (
								<img src={logoutIcon} alt="lightDashboard" width={'24px'} height={'24px'} />
							)}
						</LinksGroup>
					</ul>
				</nav>
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		sidebarOpened: store.navigation.sidebarOpened,
		sidebarStatic: store.navigation.sidebarStatic,
		alertsList: store.alerts.alertsList,
		activeItem: store.navigation.activeItem,
		navbarType: store.navigation.navbarType
	};
}

export default withRouter(connect(mapStateToProps)(Sidebar));
