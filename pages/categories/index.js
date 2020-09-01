import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FaListUl, FaSearch, FaPlus
} from 'react-icons/fa';
import CategoryList from '../../components/UI/List/Categories/CategoryList';

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
} from '../../styles/Pages/Categories/Categories';

const Categories = (props) => {
  const { categories } = props;

  console.log('categories:', categories);

  return (
    <>
      <Head>
        <title>Categories | Reseller - Canada Cannabyss</title>
      </Head>
      <Background>
        <Wrapper>
          <Container>
            <ContentContainer>
              <Content>
                <TitleSearchBarAddButtonDiv>
                  <TitleDiv>
                    <FaListUl />
                    <h1>Categories</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type='button'>
                        <FaSearch />
                      </button>
                    </SearchBar>
                    <Link href='/add/category' as='/add/category'>
                      <AddProductLink>
                        <FaPlus />
                      </AddProductLink>
                    </Link>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                <CategoryList categories={categories} />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Categories.propTypes = {
  categories: PropTypes.shape().isRequired
};

Categories.getInitialProps = async () => {
  const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/category`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return {
    categories: data
  };
};

export default Categories;
