import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {AppPage} from '../pages/page-component';
import {RedirectToHome} from './redirect-to-home-component';
import {HomeRoute, RouteMapping} from './route-mapping';
import {TRouteMappingItem} from './route-mapping-interface';

export const AppContentSwitcher: React.FC = () => {
	const [currentPage, setCurrentPage] = useState<TRouteMappingItem | null>(null);
	const location = useLocation();

	useEffect(() => {
		const locationUrl = location.pathname || 'unknown';

		if (location.pathname === '/') {
			setCurrentPage(HomeRoute);
			return;
		}

		const currentLocation = RouteMapping.find(item => locationUrl === item.url);
		if (!currentLocation) {
			setCurrentPage({
				id: 'redirect',
				title: HomeRoute.title,
				url: HomeRoute.url,
				page: <RedirectToHome/>
			});
			return;
		}

		if (currentLocation !== currentPage) {
			setCurrentPage(currentLocation);
		}
	}, [location, currentPage]);

	if (!currentPage || !currentPage.page) {
		return null;
	}

	return <AppPage>{currentPage.page}</AppPage>;
};
