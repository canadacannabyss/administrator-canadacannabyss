import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
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

const Banners = (props) => {
  const { banners } = props;

  const [bannerList, setBannerList] = useState([]);
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const [selectedBannersId, setSelectedBannersId] = useState('');
  const [selectedBannersName, setSelectedBannersName] = useState('');

  useEffect(() => {
    setBannerList(banners);
  }, []);

  const handleDeleteBanner = () => {};

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode.parentNode;
    console.log(element);
    setSelectedBannersId(element.id);
    setSelectedBannersName(element.querySelector('p').innerHTML);
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  const handleGetNewBannerssListOnDeletion = () => {
    console.log('handleGetNewPromotionsListOnDeletion');
  };

  return (
    <>
      <Head>
        <title>Banners | Administrator - Canada Cannabyss</title>
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
                <BannerList banners={bannerList} />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Banners.propTypes = {
  banners: PropTypes.shape().isRequired
};

Banners.getInitialProps = async () => {
  const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/panel/get/all/banners`, {
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
    banners: data
  };
};

export default Banners;
