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
  AddProductLink,
} from '../../styles/Pages/Resellers/Resellers';
import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';

const Reseller = () => {
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
          </Content>
        </ContentContainer>
      </Container>
    </BackgroundAdd>
  );
};

export default Reseller;
