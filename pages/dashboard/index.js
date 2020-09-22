import Head from 'next/head';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Container,
  ContainerTitle
} from '../../styles/Pages/Dashboard/Dashboard';
import {
  Background
} from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import WithAuth from '../../components/UI/withAuth/withAuth';
import { getOrders } from '../../store/actions/orders/orders';
import SalesList from '../../components/pages/Dashboard/Sales/SalesList/SalesList';

const mapStateToProps = (state) => {
  const { orders } = state;

  return { orders };
};

const Dashboard = (props) => {
  const { orders } = props;

  return (
    <WithAuth>
      <Background>
        <Head>
          <title>Dashboard | Administrator - Canada Cannabyss</title>
        </Head>
        <Wrapper>
          <Container className='sales'>
            <ContainerTitle>Sales</ContainerTitle>
            <SalesList orders={orders} />
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
};

Dashboard.propTypes = {
  orders: PropTypes.shape().isRequired
};

Dashboard.getInitialProps = async (props) => {
  const { asPath, store } = props.ctx;

  store.dispatch(getOrders());

  return {
    asPath
  };
};

export default connect(mapStateToProps)(Dashboard);
