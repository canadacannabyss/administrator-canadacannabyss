import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import React, { useState } from 'react';
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
import DeleteConfirmation from '../../components/UI/Confirmations/DeletePromotionConfirmation';
import { getPromotions } from '../../store/actions/promotions/promotions';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { promotions } = state;
  return {
    promotions
  };
};

const Promotions = (props) => {
  const { promotions } = props;

  const [selectedPromotionId, setSelectedPromotionId] = useState('');
  const [selectedPromotionName, setSelectedPromotionName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedPromotionId(element.id);
    setSelectedPromotionName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  return (
    <WithAuth>
      <Head>
        <title>Promotions | Reseller - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          promotionId={selectedPromotionId}
          promotionName={selectedPromotionName}
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
                {!_.isEmpty(promotions.data) &&
                promotions.fetched &&
                !promotions.loading &&
                !promotions.error && (
                  <PromotionList
                    promotions={promotions.data}
                    handleGetElement={handleGetElement}
                  />
                )}
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </WithAuth>
  );
};

Promotions.propTypes = {
  promotions: PropTypes.shape().isRequired
};

Promotions.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getPromotions());
};

export default connect(mapStateToProps)(Promotions);
