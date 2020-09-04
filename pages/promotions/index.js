import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
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

const Promotions = (props) => {
  const { promotions } = props;

  const [promotionCategories, setPromotionCategories] = useState([]);
  const [promotionList, setPromotionList] = useState([]);
  const [selectedPromotionId, setSelectedPromotionId] = useState('');
  const [selectedPromotionName, setSelectedPromotionName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  useEffect(() => {
    setPromotionList(promotions);
  }, []);

  const handleDeleteProduct = () => {};

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

Promotions.propTypes = {
  promotions: PropTypes.shape().isRequired
};

Promotions.getInitialProps = async () => {
  const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/promotions`, {
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
    promotions: data
  };
};

export default Promotions;
