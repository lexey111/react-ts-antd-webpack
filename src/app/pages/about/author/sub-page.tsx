import Typography from 'antd/es/typography';
import React from 'react';
import {LipsumPara} from '../../../components/lipsum';

const {Title} = Typography;

export const AuthorSubPage: React.FC = () => {
	return <>
		<Title level={1}>Author sub-page</Title>

		<LipsumPara paragraphs={4}/>
	</>;
};

