import React from 'react';
import {AboutPage} from '../pages/about';
import {AuthorPage} from '../pages/about/author';
import {AuthorSubPage} from '../pages/about/author/sub-page';
import {DataPage} from '../pages/data';
import {HomePage} from '../pages/home';
import {SettingsPage} from '../pages/settings';
import {UserPage} from '../pages/user';
import {TRouteMappingItem, TRouteMappingItems} from './route-mapping-interface';
import {prepareItems} from './route-mapping-utils';

// main app routing
export const RouteMapping: TRouteMappingItems = prepareItems([
	{id: 'home', title: 'Home', url: '/home', isHome: true, page: <HomePage/>},
	{id: 'data', title: 'Data', url: '/data', page: <DataPage/>},
	{id: 'about', title: 'About', url: '/about', page: <AboutPage/>},
	{id: 'author', title: 'Author', url: '/about/author', page: <AuthorPage/>},
	{id: 'author-sub', title: 'Author sub-page', url: '/about/author/sub-page', page: <AuthorSubPage/>},
	{id: 'settings', title: 'Settings', url: '/settings', page: <SettingsPage/>, isRightMenu: true, icon: 'setting'},
	{id: 'user', title: 'User', url: '/user', page: <UserPage/>, isRightMenu: true, icon: 'user'},
]);

export const HomeRoute: TRouteMappingItem = RouteMapping.find(item => item.isHome) as TRouteMappingItem; // suppress "undefined"

if (!HomeRoute) {
	throw new Error('No home route declared!');
}
