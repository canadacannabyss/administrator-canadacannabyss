import Head from 'next/head';
import React from 'react';

import {
  Wrapper,
  Container,
  ContainerTitle
} from '../../styles/Pages/Dashboard/Dashboard';
import {
  Background
} from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import WithAuth from '../../components/UI/withAuth/withAuth';

const Dashboard = () => (
  <WithAuth>
    <Background>
      <Head>
        <title>Dashboard | Administrator - Canada Cannabyss</title>
      </Head>
      <Wrapper>
        <Container className='sales'>
          <ContainerTitle>Sales</ContainerTitle>
          <WithAuth />
        </Container>
        <Container className='graphs'>
          <ContainerTitle>Graphs</ContainerTitle>
        </Container>
        <Container className='alerts'>
          <ContainerTitle>Alerts</ContainerTitle>
        </Container>
        <Container className='messages'>
          <ContainerTitle>Messages</ContainerTitle>
        </Container>
        <Container className='settings'>
          <ContainerTitle>Settings</ContainerTitle>
        </Container>
      </Wrapper>
    </Background>
  </WithAuth>
);

Dashboard.getInitialProps = async (props) => {
  const { asPath } = props.ctx;

  return {
    asPath
  };
};

export default Dashboard;
