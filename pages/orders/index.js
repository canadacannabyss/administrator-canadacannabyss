import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
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
                <OrderList orders={orders} />
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

Orders.getInitialProps = async () => {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/orders`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await res.json();
  return {
    orders: data
  };
};

export default Orders;
