import Breadcrumb from 'antd/es/breadcrumb';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {HomeRoute} from '../../routing/route-mapping';
import {TRouteMappingItem, TRouteMappingItems} from '../../routing/route-mapping-interface';
import {getRouteByUrl} from '../../routing/route-mapping-utils';

function calculateBreadCrumbs(locationUrl: string): Array<TRouteMappingItem> {
	if (location.pathname === HomeRoute.url) {
		return [];
	}

	const currentLocation = getRouteByUrl(locationUrl);
	if (!currentLocation) {
		return [HomeRoute];
	}

	const parts = currentLocation.url.split('/').filter(item => Boolean(item));
	parts.pop(); // remove current route

	const actualBreadcrumbs = [HomeRoute];

	let currentPath = '';
	parts.forEach(part => {
		currentPath += '/' + part;
		const currentPart = getRouteByUrl(currentPath);
		if (currentPart) {
			actualBreadcrumbs.push(currentPart);
		}
	});

	actualBreadcrumbs.push(currentLocation);

	return actualBreadcrumbs;
}

export const AppBreadcrumbs: React.FC = () => {
	const location = useLocation();
	const [breadcrumbs, setBreadcrumbs] = useState<TRouteMappingItems>([]);

	useEffect(() => {
		const locationUrl = location.pathname || 'unknown';

		setBreadcrumbs(calculateBreadCrumbs(locationUrl));
	}, [location]);

	if (!breadcrumbs.length) {
		return null;
	}

	return <Breadcrumb
		className={'app-breadcrumbs'}>
		{breadcrumbs.map((item, idx) => {
			return <Breadcrumb.Item key={idx}>
				{idx === breadcrumbs.length - 1 && item.title}

				{idx < breadcrumbs.length - 1 &&
				<Link to={item.url}>
					{item.title}
				</Link>
				}
			</Breadcrumb.Item>;
		})}
	</Breadcrumb>;
};
