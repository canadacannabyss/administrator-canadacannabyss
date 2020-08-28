import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import {
  FaSearch, FaPlus, FaObjectUngroup
} from 'react-icons/fa';
import BannerList from '../../components/UI/List/Banners/BannersList';

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
} from '../../styles/Pages/Banners/Banners';

const banners = [
  {
    promotionName: 'First Promotion',
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
    promotionName: 'First Promotion',
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
    promotionName: 'First Promotion',
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
    promotionName: 'First Promotion',
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
    promotionName: 'First Promotion',
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
    promotionName: 'First Promotion',
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
    promotionName: 'First Promotion',
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
    promotionName: 'First Promotion',
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

const Banners = () => (
  <>
    <Head>
      <title>Banners | Reseller - Canada Cannabyss</title>
    </Head>
    <Background>
      <Wrapper>
        <Container>
          <ContentContainer>
            <Content>
              <TitleSearchBarAddButtonDiv>
                <TitleDiv>
                  <FaObjectUngroup />
                  <h1>Banners</h1>
                </TitleDiv>
                <SearchBarAddButtonDiv>
                  <SearchBar>
                    <input />
                    <button type='button'>
                      <FaSearch />
                    </button>
                  </SearchBar>
                  <Link href='/add/banner' as='/add/banner'>
                    <AddProductLink>
                      <FaPlus />
                    </AddProductLink>
                  </Link>
                </SearchBarAddButtonDiv>
              </TitleSearchBarAddButtonDiv>
              <BannerList banners={banners} />
            </Content>
          </ContentContainer>
        </Container>
      </Wrapper>
    </Background>
  </>
);

Banners.getInitialProps = async () => {
  const repos = await fetch('https://api.github.com/users/Davi-Silva/repos');

  const data = await repos.json();
  return {
    repos: data
  };
};

export default Banners;
