import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import DeleteConfirmation from '../../components/UI/Confirmations/DeleteBundleConfirmation';
import { getBundles } from '../../store/actions/bundles/bundles';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { bundles } = state;

  return {
    bundles
  };
};

const Bundles = (props) => {
  const { bundles } = props;

  const [selectedBundleId, setSelectedBundleId] = useState('');
  const [selectedBundleName, setSelectedBundleName] = useState('');
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

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

  return (
    <WithAuth>
      <Head>
        <title>Bundles | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          bundleId={selectedBundleId}
          bundleName={selectedBundleName}
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
                {!_.isEmpty(bundles.data) &&
                  bundles.fetched &&
                  !bundles.error &&
                  !bundles.loading && (
                  <BundleList
                    bundles={bundles.data}
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

Bundles.propTypes = {
  bundles: PropTypes.shape().isRequired
};

Bundles.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;
  store.dispatch(getBundles());
};

export default connect(mapStateToProps)(Bundles);
