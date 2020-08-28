import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import {
  FaSortAmountDownAlt, FaSearch, FaPlus
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
  AddProductLink,
  TitleDiv,
  Content
} from '../../styles/Pages/Orders/Orders';

const orders = [
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  },
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  },
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  },
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  },
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  },
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  },
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  },
  {
    orderName: 'First Order',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: false,
    slug: 'first-product'
  }

];

const Promotions = () => (
  <>
    <Head>
      <title>Promotions | Reseller - Canada Cannabyss</title>
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

Promotions.getInitialProps = async () => {
  const repos = await fetch('https://api.github.com/users/Davi-Silva/repos');

  const data = await repos.json();
  return {
    repos: data
  };
};

export default Promotions;
