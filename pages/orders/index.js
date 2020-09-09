import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FaSortAmountDownAlt, FaSearch
} from 'react-icons/fa';
import OrderList from '../../components/UI/List/Orders/OrderList';
import {
  Background
} from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  Wrapper,
  Container,
  ContentContainer,
  SearchBarAddButtonDiv,
  TitleSearchBarAddButtonDiv,
  SearchBar,
  TitleDiv,
  Content
} from '../../styles/Pages/Orders/Orders';
import { getOrders } from '../../store/actions/orders/orders';

const mapStateToProps = (state) => {
  const { orders } = state;
  return { orders };
};

const Orders = (props) => {
  const { orders } = props;

  return (
    <>
      <Head>
        <title>Orders | Administrator - Canada Cannabyss</title>
      </Head>
      <Background>
        <Wrapper>
          <Container>
            <ContentContainer>
              <Content>
                <TitleSearchBarAddButtonDiv>
                  <TitleDiv>
                    <FaSortAmountDownAlt />
                    <h1>Orders</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type='button'>
                        <FaSearch />
                      </button>
                    </SearchBar>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                {!_.isEmpty(orders.data) &&
                  orders.fetched &&
                  !orders.error &&
                  !orders.loading && (
                    <OrderList
                      orders={orders.data}
                    />
                )}
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Orders.propTypes = {
  orders: PropTypes.shape().isRequired
};

Orders.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getOrders());
};

export default connect(mapStateToProps)(Orders);
