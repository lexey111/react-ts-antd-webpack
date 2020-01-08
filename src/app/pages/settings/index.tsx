import React from 'react';
import {LipsumPara} from '../../components/lipsum';
import Typography from 'antd/es/typography';
const { Title } = Typography;

export const SettingsPage: React.FC = () => {
	return <>
		<Title level={1}>Settings page</Title>

		<LipsumPara paragraphs={2}/>
	</>;
};

