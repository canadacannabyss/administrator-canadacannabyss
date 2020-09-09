import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { getBanners } from '../../store/actions/banners/banners';
import DeleteConfirmation from '../../components/UI/Confirmations/DeleteBannerConfirmation';

const mapStateToProps = (state) => {
  const { banners } = state;
  return { banners };
};

const Banners = (props) => {
  const { banners } = props;

  const [bannerList, setBannerList] = useState([]);
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const [selectedBannersId, setSelectedBannersId] = useState('');
  const [selectedBannersName, setSelectedBannersName] = useState('');

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedBannersId(element.id);
    setSelectedBannersName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  return (
    <>
      <Head>
        <title>Banners | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          bannerId={selectedBannersId}
          bannerName={selectedBannersName}
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
                {!_.isEmpty(banners.data) &&
                  banners.fetched &&
                  !banners.error &&
                  !banners.loading && (
                    <BannerList
                      banners={banners.data}
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

Banners.propTypes = {
  banners: PropTypes.shape().isRequired
};

Banners.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getBanners());
};

export default connect(mapStateToProps)(Banners);
