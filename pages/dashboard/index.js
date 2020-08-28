import Head from 'next/head';
import React from 'react';

import {
  Wrapper,
  Container,
  ContainerTitle,
} from '../../styles/Pages/Dashboard/Dashboard';

const Dashboard = () => (
  <>
    <Head>
      <title>Dashboard | Reseller - Canada Cannabyss</title>
    </Head>
    <Wrapper>
      <Container className='sales'>
        <ContainerTitle>Sales</ContainerTitle>
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
  </>
);

Dashboard.getInitialProps = async (props) => {
  const { asPath } = props.ctx;

  return {
    asPath,
  };
};

export default Dashboard;
