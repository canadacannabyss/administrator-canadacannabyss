import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FaUsers, FaSearch, FaPlus } from 'react-icons/fa';
import {
  Container,
  ContentContainer,
  Content,
  Title,
  ToCreateReseller,
  Wrapper,
  SearchBar,
  SearchBarAddButtonDiv,
  TitleDiv,
  TitleSearchBarAddButtonDiv,
  AddProductLink
} from '../../styles/Pages/Resellers/Resellers';
import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import ResellerList from '../../components/UI/List/Resellers/ResellerList';
import { getResellers } from '../../store/actions/resellers/resellers';
import DeleteConfirmation from '../../components/UI/Confirmations/DeleteResellerConfirmation';

const mapStateToProps = (state) => {
  const { resellers } = state;

  return {
    resellers
  };
};

const Resellers = (props) => {
  const { resellers } = props;

  const [selectedResellerId, setSelectedResellerId] = useState('');
  const [selectedResellerName, setSelectedResellerName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedResellerId(element.id);
    setSelectedResellerName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  return (
    <BackgroundAdd>
      <Head>
        <title>Resellers | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          resellerId={selectedResellerId}
          resellerName={selectedResellerName}
          handleCloseDeleteConfirmation={handleCloseDeleteConfirmation}
        />
      )}
      <Container>
        <ContentContainer>
          <Content>
            <TitleSearchBarAddButtonDiv>
              <TitleDiv>
                <FaUsers />
                <h1>Resellers</h1>
              </TitleDiv>
              <SearchBarAddButtonDiv>
                <SearchBar>
                  <input />
                  <button type='button'>
                    <FaSearch />
                  </button>
                </SearchBar>
                <Link href='/add/reseller' as='/add/reseller'>
                  <AddProductLink>
                    <FaPlus />
                  </AddProductLink>
                </Link>
              </SearchBarAddButtonDiv>
            </TitleSearchBarAddButtonDiv>
            {!_.isEmpty(resellers.data) &&
            resellers.fetched &&
            !resellers.loading &&
            !resellers.error && (
              <ResellerList
                resellers={resellers.data}
                handleGetElement={handleGetElement}
              />
            )}
          </Content>
        </ContentContainer>
      </Container>
    </BackgroundAdd>
  );
};

Resellers.propTypes = {
  resellers: PropTypes.shape().isRequired
};

Resellers.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getResellers());
};

export default connect(mapStateToProps)(Resellers);
