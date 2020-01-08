import React from 'react';
import {Redirect} from 'react-router-dom';
import {RouteMapping} from './route-mapping';

const homeRoute = RouteMapping.find(item => item.isHome);

if (!homeRoute) {
	throw new Error('No home route declared!');
}

export const RedirectToHome: React.FC = () => {
	return <Redirect to={homeRoute.url}/>;
};
