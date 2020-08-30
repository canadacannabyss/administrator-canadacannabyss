import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
import DeleteConfirmation from '../../components/UI/Confirmations/DeleteProductConfirmation';

const Products = (props) => {
  const { products } = props;

  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const handleDeleteProduct = () => {};

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedProductId(element.id);
    setSelectedProductName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  const handleGetNewProductsListOnDeletion = () => {
    console.log('handleGetNewProductsListOnDeletion');
  };

  return (
    <>
      <Head>
        <title>Products | Reseller - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          productId={selectedProductId}
          productName={selectedProductName}
          handleCloseDeleteConfirmation={handleCloseDeleteConfirmation}
          handleGetNewProductsListOnDeletion={
            handleGetNewProductsListOnDeletion
          }
        />
      )}
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
                <ProductList
                  products={products}
                  handleGetElement={handleGetElement}
                />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Products.propTypes = {
  products: PropTypes.shape().isRequired
};

Products.getInitialProps = async () => {
  const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/products`, {
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
    products: data
  };
};

export default Products;
