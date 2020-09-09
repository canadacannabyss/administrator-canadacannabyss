import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Background } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  Wrapper,
  Container,
  ContentContainer,
  SearchBarAddButtonDiv,
  TitleSearchBarAddButtonDiv,
  SearchBar,
  TitleDiv,
  Content,
} from '../../styles/Pages/Orders/Orders';
import { getOrder } from '../../store/actions/order/order';

const mapStateToProps = (state) => {
  const { order } = state;
  return { order };
};

const Order = (props) => {
  const { order } = props;

  const [orderId, setOrderId] = useState({});

  useEffect(() => {
    if (
      !_.isEmpty(order.data) &&
      order.fetched &&
      !order.loading &&
      !order.error
    ) {
      setOrderId(order.data._id);
    }
  }, [order]);

  return (
    <>
      <Head>
        <title>{`Order: ${orderId} | Administrator - Canada Cannabyss`}</title>
      </Head>
      <Background>
        <Wrapper>
          <Container>
            <ContentContainer>
              <Content>
                <TitleSearchBarAddButtonDiv>
                  <TitleDiv>
                    <h1>
                      Order: <span>{`${orderId}`}</span>
                    </h1>
                  </TitleDiv>
                </TitleSearchBarAddButtonDiv>
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Order.propTypes = {
  order: PropTypes.string.isRequired,
};

Order.getInitialProps = async ({ ctx }) => {
  const { asPath, store } = ctx;

  const orderId = asPath.substring(6, asPath.length);

  store.dispatch(getOrder(orderId));
};

export default connect(mapStateToProps)(Order);
