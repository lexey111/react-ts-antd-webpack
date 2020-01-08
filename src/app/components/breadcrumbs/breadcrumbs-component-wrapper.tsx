import React from 'react';
import {AppBreadcrumbs} from './breadcrumbs-component';

// Wrapper for Affix: it requires ref

function appBreadcrumb(props, ref): any {
	return <AppBreadcrumbs {...props} forwardedRef={ref}/>;
}

export const AppBreadcrumbsWrapper = React.forwardRef(appBreadcrumb);
