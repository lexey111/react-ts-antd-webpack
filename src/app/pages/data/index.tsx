import Typography from 'antd/es/typography';
import React from 'react';
import {LipsumPara} from '../../components/lipsum';

const {Title} = Typography;

export const DataPage: React.FC = () => {
	return <>
		<Title level={1}>Data page</Title>

		<LipsumPara paragraphs={28}/>
	</>;
};

