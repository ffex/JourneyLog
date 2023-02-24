import React, { useContext } from 'react';
import { Col, Row, Typography } from 'antd';
import { JourneyModeContext } from 'contexts/journey';
import { Button, Card, Select, SelectProps, useSelect } from '@pankod/refine-antd';
import { IJourney } from 'interfaces';
import { JourneyInfo } from 'components/dashboard/journeyInfo';
import { JourneyMap } from 'components/map/journeyMap';
import { JourneyTimeline } from 'components/dashboard/stopLine';
import { StopsList } from 'components/dashboard/stops';
import { TodosList } from 'pages/Todo/list';
import { TodoCompList } from 'components/dashboard/todoComponentList';


const { Text } = Typography;


export const DashboardPage: React.FC = () => {


    return (
        <>
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <JourneyInfo />
                </Col>
                <Col span={16}>
                    <JourneyMap />
                </Col>
                <Col span={8}>
                    <JourneyTimeline />
                </Col>
                <Col span={16}>

                    <TodoCompList />
                </Col>
                <Col span={8}>

                    <StopsList />
                </Col>
            </Row>
            


        </>
    );

};