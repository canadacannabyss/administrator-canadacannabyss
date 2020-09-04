import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  FaBoxes, FaSearch, FaPlus
} from 'react-icons/fa';
import BundleList from '../../components/UI/List/Bundles/BundleList';

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
} from '../../styles/Pages/Bundles/Bundles';
import DeleteConfirmation from '../../components/UI/Confirmations/DeleteProductConfirmation';

const Bundles = (props) => {
  const { bundles } = props;

  const [bundleList, setBundleList] = useState([]);
  const [selectedBundleId, setSelectedBundleId] = useState('');
  const [selectedBundleName, setSelectedBundleName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  useEffect(() => {
    setBundleList(bundles);
  }, []);

  const handleDeleteBundle = () => {};

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedBundleId(element.id);
    setSelectedBundleName(element.children[0].children[0].innerHTML);
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
        <title>Bundles | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          productId={selectedBundleId}
          productName={selectedBundleName}
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
                    <FaBoxes />
                    <h1>Bundles</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type='button'>
                        <FaSearch />
                      </button>
                    </SearchBar>
                    <Link href='/add/bundle' as='/add/bundle'>
                      <AddProductLink>
                        <FaPlus />
                      </AddProductLink>
                    </Link>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                <BundleList bundles={bundleList} handleGetElement={handleGetElement} />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Bundles.getInitialProps = async () => {
  const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/bundles`, {
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
    bundles: data
  };
};

export default Bundles;
