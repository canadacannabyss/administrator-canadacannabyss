import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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

const Resellers = (props) => {
  const { resellers } = props;

  return (
    <BackgroundAdd>
      <Head>
        <title>Resellers | Administrator - Canada Cannabyss</title>
      </Head>
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
            <ResellerList resellers={resellers} />
          </Content>
        </ContentContainer>
      </Container>
    </BackgroundAdd>
  );
};

Resellers.getInitialProps = async () => {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/admin/resellers`,
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
    resellers: data
  };
};

export default Resellers;
