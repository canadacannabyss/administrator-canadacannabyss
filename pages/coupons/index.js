import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
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

const mapStateToProps = (state) => {
  const { coupons } = state;

  return {
    coupons
  };
};

const Coupons = (props) => {
  const { coupons } = props;

  return (
    <>
      <Head>
        <title>Coupons | Administrator - Canada Cannabyss</title>
      </Head>
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
                  <CouponList coupons={coupons.data} />
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
