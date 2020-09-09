import Head from 'next/head';
import Link from 'next/link';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
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
import { getCategories } from '../../store/actions/categories/categories';
import DeleteConfirmation from '../../components/UI/Confirmations/DeleteCategoryConfirmation';

const mapStateToProps = (state) => {
  const { categories } = state;

  return {
    categories
  };
};

const Categories = (props) => {
  const { categories } = props;

  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedCategoryId(element.id);
    setSelectedCategoryName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  return (
    <>
      <Head>
        <title>Categories | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          categoryId={selectedCategoryId}
          categoryName={selectedCategoryName}
          handleCloseDeleteConfirmation={handleCloseDeleteConfirmation}
        />
      )}
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
                {!_.isEmpty(categories.data) &&
                categories.fetched &&
                !categories.loading &&
                !categories.error && (
                  <CategoryList
                    categories={categories.data}
                    handleGetElement={handleGetElement}
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

Categories.propTypes = {
  categories: PropTypes.shape().isRequired
};

Categories.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getCategories());
};

export default connect(mapStateToProps)(Categories);
