import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './app/app';
import './styles/app.less';

const runApp = (): void => {
	ReactDOM.render(
		<App/>,
		document.getElementById('app-mount-point')
	);
};

runApp();

// Hot reloading
if ((module as any).hot) {
	(module as any).hot['accept']('./App', () => {
		runApp();
	});
}
