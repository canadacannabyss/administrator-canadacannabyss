import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  FaShippingFast, FaSearch, FaPlus
} from 'react-icons/fa';
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
} from '../../styles/Pages/Coupons/Coupons';
import PostalServiceList from '../../components/UI/List/PostalServices/PostServiceList';
import { getPostalServices } from '../../store/actions/postalServices/postalServices';
import DeleteConfirmation from '../../components/UI/Confirmations/DeletePostalServiceConfirmation';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { postalServices } = state;

  return {
    postalServices
  };
};

const PostalServices = (props) => {
  const { postalServices } = props;

  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = useState(
    false
  );

  const [selectedCouponId, setSelectedCouponId] = useState('');
  const [selectedCouponName, setSelectedCouponName] = useState('');

  const handleGetElement = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedCouponId(element.id);
    setSelectedCouponName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setToggleDeleteConfirmation(false);
  };

  return (
    <WithAuth>
      <Head>
        <title>Postal Services | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          postalServiceId={selectedCouponId}
          postalServiceName={selectedCouponName}
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
                    <FaShippingFast />
                    <h1>Postal Services</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type='button'>
                        <FaSearch />
                      </button>
                    </SearchBar>
                    <Link href='/add/postal-service' as='/add/postal-service'>
                      <AddProductLink>
                        <FaPlus />
                      </AddProductLink>
                    </Link>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                {!_.isEmpty(postalServices.data) &&
                  postalServices.fetched &&
                  !postalServices.error &&
                  !postalServices.loading && (
                  <PostalServiceList
                    postalServices={postalServices.data}
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

PostalServices.propTypes = {
  postalServices: PropTypes.shape().isRequired
};

PostalServices.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getPostalServices());
};

export default connect(mapStateToProps)(PostalServices);
