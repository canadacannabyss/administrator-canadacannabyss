import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  FaPercent, FaSearch, FaPlus
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
import CouponList from '../../components/UI/List/Coupons/CouponList';
import { getCoupons } from '../../store/actions/coupons/coupons';
import DeleteConfirmation from '../../components/UI/Confirmations/DeleteCouponConfirmation';

const mapStateToProps = (state) => {
  const { coupons } = state;

  return {
    coupons
  };
};

const Coupons = (props) => {
  const { coupons } = props;

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
    <>
      <Head>
        <title>Coupons | Administrator - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmation && (
        <DeleteConfirmation
          couponId={selectedCouponId}
          couponName={selectedCouponName}
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
                    <FaPercent />
                    <h1>Coupons</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type='button'>
                        <FaSearch />
                      </button>
                    </SearchBar>
                    <Link href='/add/coupon' as='/add/coupon'>
                      <AddProductLink>
                        <FaPlus />
                      </AddProductLink>
                    </Link>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                {!_.isEmpty(coupons.data) &&
                  coupons.fetched &&
                  !coupons.error &&
                  !coupons.loading && (
                  <CouponList
                    coupons={coupons.data}
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

Coupons.propTypes = {
  coupons: PropTypes.shape().isRequired
};

Coupons.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getCoupons());
};

export default connect(mapStateToProps)(Coupons);
