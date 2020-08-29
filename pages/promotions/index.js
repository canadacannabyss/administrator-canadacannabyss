import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  FaTags, FaSearch, FaPlus
} from 'react-icons/fa';
import PromotionList from '../../components/UI/List/Promotions/PromotionList';

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
} from '../../styles/Pages/Promotions/Promotions';

const Promotions = () => {
  const [promotionCategories, setPromotionCategories] = useState([]);
  const [promotionList, setPromotionList] = useState([]);
  const [selectedPromotionId, setSelectedPromotionId] = useState('');
  const [selectedPromotionName, setSelectedPromotionName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const handleDeleteProduct = () => {};

  const fetchCategories = async () => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/panel/get/categories/products`,
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
    setPromotionCategories(data);
  };

  const fetchAllPromotions = async () => {
    const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/promotions/get/all`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    setPromotionList(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchAllPromotions();
  }, []);

  const getPromotionsByCategory = async (category) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/panel/get/products/by/category/${category}`,
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
    setPromotionList(data);
  };

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode.parentNode;
    console.log(element);
    setSelectedPromotionId(element.id);
    setSelectedPromotionName(element.querySelector('p').innerHTML);
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  const handleGetNewPromotionsListOnDeletion = () => {
    console.log('handleGetNewPromotionsListOnDeletion');
    fetchCategories();
  };

  return (
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
                    <FaTags />
                    <h1>Promotions</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type='button'>
                        <FaSearch />
                      </button>
                    </SearchBar>
                    <Link href='/add/promotion' as='/add/promotion'>
                      <AddProductLink>
                        <FaPlus />
                      </AddProductLink>
                    </Link>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                <PromotionList promotions={promotionList} />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Promotions.getInitialProps = async () => {
  const repos = await fetch('https://api.github.com/users/Davi-Silva/repos');

  const data = await repos.json();
  return {
    repos: data
  };
};

export default Promotions;
