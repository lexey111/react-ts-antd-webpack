import Typography from 'antd/es/typography';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {LipsumPara} from '../../components/lipsum';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';
import {getRouteById} from '../../routing/route-mapping-utils';

const {Title} = Typography;

export const AboutPage: React.FC = () => {
	const [authorRoute, setAuthorRoute] = useState<TRouteMappingItem>();
	const [authorSubRoute, setAuthorSubRoute] = useState<TRouteMappingItem>();

	useEffect(() => {
		const authorPage = getRouteById('author');
		const authorSubPage = getRouteById('author-sub');
		setAuthorRoute(authorPage);
		setAuthorSubRoute(authorSubPage);
	}, []);

	return <>
		<Title level={1}>About page</Title>

		<LipsumPara paragraphs={3}/>

		<Title level={2}>Secondary pages</Title>
		<ul>
			<li>{authorRoute && <Link to={authorRoute.url}>Click me (Author, level 2)</Link>}</li>
			<li>{authorSubRoute && <Link to={authorSubRoute.url}>Click me (Author sub-page, level 3)</Link>}</li>
		</ul>
	</>;
};

