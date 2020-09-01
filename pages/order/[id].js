import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
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

const Order = (props) => {
  const { order } = props;

  return (
    <>
      <Head>
        <title>{`Order: ${order._id} | Administrator - Canada Cannabyss`}</title>
      </Head>
      <Background>
        <Wrapper>
          <Container>
            <ContentContainer>
              <Content>
                <TitleSearchBarAddButtonDiv>
                  <TitleDiv>
                    <h1>
                      Order: <span>{`${order._id}`}</span>
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

Order.getInitialProps = async (props) => {
  const { asPath } = props.ctx;

  const orderId = asPath.substring(6, asPath.length);

  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/orders/${orderId}`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  return {
    order: data,
  };
};

export default Order;
