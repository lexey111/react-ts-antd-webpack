import React from 'react';
import {LipsumPara} from '../../../components/lipsum';

import Typography from 'antd/es/typography';
const { Title } = Typography;

export const AuthorPage: React.FC = () => {
	return <>
		<Title level={1}>Author page</Title>

		<LipsumPara paragraphs={4}/>
	</>;
};

