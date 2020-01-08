import React from 'react';

export type TRouteMappingItem = {
	id: string // unique route id
	title: string // Menu item title
	icon?: string // ANTD icon
	url: string // url to go
	isHome?: boolean // is it Home page?
	page?: React.ReactElement // page (component) to render
	isRightMenu?: boolean // show in the right menu? (default = false)
	isSecondary?: boolean // do not show in menu if true, it is internal (secondary) page
};

export type TRouteMappingItems = Array<TRouteMappingItem> | never;
