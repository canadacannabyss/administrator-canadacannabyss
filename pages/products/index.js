import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { FaBox, FaSearch, FaPlus } from "react-icons/fa";
import ProductList from "../../components/UI/List/Products/ProductList";
import { Background } from "../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage";
import {
  Wrapper,
  Container,
  ContentContainer,
  SearchBarAddButtonDiv,
  TitleSearchBarAddButtonDiv,
  SearchBar,
  AddProductLink,
  TitleDiv,
  Content,
} from "../../styles/Pages/Products/Products";
import DeleteConfirmation from "../../components/UI/Confirmations/DeleteProductConfirmation";
import { getProducts } from "../../store/actions/products/products";
import WithAuth from "../../components/UI/withAuth/withAuth";

const mapStateToProps = (state) => {
  const { products } = state;

  return { products };
};

const Products = (props) => {
  const { products } = props;

  const dispatch = useDispatch();

  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

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

  return (
    <WithAuth>
      <Head>
        <title>Products | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          productId={selectedProductId}
          productName={selectedProductName}
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
                    <FaBox />
                    <h1>Products</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type="button">
                        <FaSearch />
                      </button>
                    </SearchBar>
                    <Link href="/add/product" as="/add/product">
                      <AddProductLink>
                        <FaPlus />
                      </AddProductLink>
                    </Link>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                <ProductList
                  products={products.data}
                  handleGetElement={handleGetElement}
                />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </WithAuth>
  );
};

Products.propTypes = {
  products: PropTypes.shape().isRequired,
};

Products.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getProducts());
};

export default connect(mapStateToProps)(Products);
