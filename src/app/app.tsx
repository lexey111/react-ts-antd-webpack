import Affix from 'antd/es/affix';
import Layout from 'antd/es/layout';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppBreadcrumbsWrapper} from './components/breadcrumbs/breadcrumbs-component-wrapper';
import {AppFooter} from './components/footer/footer-component';
import {AppMainMenu} from './components/main-menu/main-menu-component';
import {AppContentSwitcher} from './routing/content-switcher';

const {Header, Footer, Content} = Layout;

export const App: React.FC = () => {
	return <div className={'app-container'}>
		<Router>
			<Layout className={'app-layout'}>
				<Header className={'app-menu'}>
					<AppMainMenu/>
				</Header>

				<Content className={'app-content'}>
					<Affix className={'app-menu-affix'}>
						<AppBreadcrumbsWrapper/>
					</Affix>
					<AppContentSwitcher/>
				</Content>

				<Footer className={'app-footer'}><AppFooter/></Footer>
			</Layout>
		</Router>
	</div>;
};
