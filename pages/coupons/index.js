import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import {
  FaPercent, FaSearch, FaPlus
} from 'react-icons/fa';
import CouponList from '../../components/UI/List/Coupons/CouponList';

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
                <CouponList coupons={coupons} />
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </>
  );
};

Coupons.getInitialProps = async () => {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/coupons/get/all`,
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
  const data = await res.json();
  return {
    coupons: data
  };
};

export default Coupons;
