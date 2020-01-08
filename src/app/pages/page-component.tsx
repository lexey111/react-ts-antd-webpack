import React from 'react';

export const AppPage: React.FC<{ children?: any }> = (props) => {
	return <div className={'app-page'}>{props?.children}</div>;
};
