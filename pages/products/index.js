import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import {
  FaBox, FaSearch, FaPlus
} from 'react-icons/fa';
import ProductList from '../../components/UI/List/Products/ProductList';
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
} from '../../styles/Pages/Products/Products';

const products = [
  {
    productName: 'First Product',
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
    productName: 'First Product',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: true,
    slug: 'first-product'
  },
  {
    productName: 'First Product',
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
    productName: 'First Product',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: true,
    slug: 'first-product'
  },
  {
    productName: 'First Product',
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
    productName: 'First Product',
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
    productName: 'First Product',
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
    productName: 'First Product',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: true,
    slug: 'first-product'
  },
  {
    productName: 'First Product',
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
    productName: 'First Product',
    prices: {
      price: 32.65,
      compareTo: 40.00
    },
    createdOn: 'December 30, 2019',
    updatedOn: 'December 31, 2019',
    featured: true,
    slug: 'first-product'
  }
];

const Products = () => (
  <>
    <Head>
      <title>Products | Reseller - Canada Cannabyss</title>
    </Head>
    <Background>
      <Wrapper>
        <Container>
          <ContentContainer>
            <Content>
              <TitleSearchBarAddButtonDiv>
                <TitleDiv>
                  <FaBox />
                  <h1>Products</h1>
                </TitleDiv>
                <SearchBarAddButtonDiv>
                  <SearchBar>
                    <input />
                    <button type='button'>
                      <FaSearch />
                    </button>
                  </SearchBar>
                  <Link href='/add/product' as='/add/product'>
                    <AddProductLink>
                      <FaPlus />
                    </AddProductLink>
                  </Link>
                </SearchBarAddButtonDiv>
              </TitleSearchBarAddButtonDiv>
              <ProductList products={products} />
            </Content>
          </ContentContainer>
        </Container>
      </Wrapper>
    </Background>
  </>
);

Products.getInitialProps = async () => {
  const repos = await fetch('https://api.github.com/users/Davi-Silva/repos');

  const data = await repos.json();
  return {
    repos: data
  };
};

export default Products;
