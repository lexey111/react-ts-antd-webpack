import Menu from 'antd/es/menu';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {RouteMapping} from '../../routing/route-mapping';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';
import {getRouteByUrl} from '../../routing/route-mapping-utils';

type TMenuItems = Array<TRouteMappingItem & { isActive: boolean }>;

function createMenuItem(item: TRouteMappingItem): React.ReactNode {
	return <Menu.Item key={item.url} className={'app-menu-item'} icon={item.icon}>
		<Link to={item.url}>
			{item.title}
		</Link>
	</Menu.Item>;
}

function calculateMenuParts(locationUrl: string): [TMenuItems, TMenuItems, string] {
	const parts = locationUrl.split('/').filter(item => Boolean(item));
	const firstLevelActiveItem = getRouteByUrl(parts.length ? '/' + parts[0] : '');
	const firstLevelActiveUrl = firstLevelActiveItem?.url || '';

	const leftMenu = RouteMapping
		.filter(item => item.isRightMenu !== true)
		.filter(item => item.isSecondary !== true)
		.map(item => ({...item, isActive: item.url === firstLevelActiveUrl}));

	const rightMenu = RouteMapping
		.filter(item => item.isRightMenu === true)
		.filter(item => item.isSecondary !== true)
		.map(item => ({...item, isActive: item.url === firstLevelActiveUrl}));

	return [leftMenu, rightMenu, firstLevelActiveUrl];
}

// eslint-disable-next-line react/no-multi-comp
export const AppMainMenu: React.FC = () => {
	const location = useLocation();
	const [leftMenuItems, setLeftMenuItems] = useState<TMenuItems>([]);
	const [rightMenuItems, setRightMenuItems] = useState<TMenuItems>([]);
	const [activeItemKey, setActiveItemKey] = useState('');

	useEffect(() => {
		const locationUrl = location.pathname || 'unknown';
		// re-render on each location change to update active state and actualize menu items
		const [leftMenu, rightMenu, activeKey] = calculateMenuParts(locationUrl);

		setLeftMenuItems(leftMenu);
		setRightMenuItems(rightMenu);
		setActiveItemKey(activeKey);
	}, [location]);

	return <div className={'app-main-menu-container'}>
		<Menu
			className={'app-main-menu'}
			theme="dark"
			mode="horizontal"
			disabledOverflow={true}
			selectedKeys={[activeItemKey]}>
			{leftMenuItems.map(createMenuItem)}
			<Menu.Item key={'menu-stub'} className={'app-menu-stub'} disabled={true}/>
			{rightMenuItems.map(createMenuItem)}
		</Menu>
	</div>;
};
