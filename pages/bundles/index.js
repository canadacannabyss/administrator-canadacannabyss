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

const Bundles = () => {
  const [bundlesCategories, setBundlesCategories] = useState([]);
  const [bundleList, setBundleList] = useState([]);
  const [selectedBundleId, setSelectedBundleId] = useState('');
  const [selectedBundleName, setSelectedBundleName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const fetchCategories = async () => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/panel/get/categories/bundles`,
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
    const data = await response.json();
    setBundlesCategories(data);
  };

  const fetchAllBundles = async () => {
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
    setBundleList(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchAllBundles();
  }, []);

  const getProductsByCategory = async (category) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/panel/get/bundles/by/category/${category}`,
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
    const data = await response.json();
    setBundleList(data);
  };

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode.parentNode;
    console.log(element);
    setSelectedBundleId(element.id);
    setSelectedBundleName(element.querySelector('p').innerHTML);
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  const handleGetNewBundleListOnDeletion = (products) => {
    setBundleList(products);
  };

  return (
    <>
      <Head>
        <title>Bundles | Reseller - Canada Cannabyss</title>
      </Head>
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
                <BundleList bundles={bundleList} />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Bundles.getInitialProps = async () => {
  const repos = await fetch('https://api.github.com/users/Davi-Silva/repos');

  const data = await repos.json();
  return {
    repos: data
  };
};

export default Bundles;
