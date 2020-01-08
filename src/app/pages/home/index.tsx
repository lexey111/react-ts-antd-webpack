import Typography from 'antd/es/typography';
import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {LipsumPara} from '../../components/lipsum';
import {RouteMapping} from '../../routing/route-mapping';

const {Title} = Typography;

function showRoutes(): Array<ReactElement> {
	return RouteMapping.map((route, idx) => {
		let result = <li key={route.url}><Link to={route.url}>{route.title}</Link></li>;
		if (route.isSecondary) {
			result = <ul key={idx}>{result}</ul>;
		}
		return result;
	});
}

export const HomePage: React.FC = () => {
	return <>
		<Title level={1}>Home page</Title>
		<Title level={2}>Links</Title>
		<ul>
			{showRoutes()}
		</ul>

		<Title level={2}>Filler</Title>
		<LipsumPara paragraphs={22}/>
	</>;
};

