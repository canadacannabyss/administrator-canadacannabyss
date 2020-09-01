import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
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
} from '../../styles/Pages/Reseller/Reseller';
import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';

const Reseller = (props) => {
  const { reseller, error } = props;

  return (
    <BackgroundAdd>
      <Head>
        <title>Reseller | Administrator - Canada Cannabyss</title>
      </Head>
      <Container>
        <ContentContainer>
          <Content>
            <TitleSearchBarAddButtonDiv>
              {error ? (
                <TitleDiv>
                  <h1>{`${error}`}</h1>
                </TitleDiv>
              ) : (
                <TitleDiv>
                  <h1>{`${reseller.names.firstName} ${reseller.names.lastName}`}</h1>
                </TitleDiv>
              )}
            </TitleSearchBarAddButtonDiv>
          </Content>
        </ContentContainer>
      </Container>
    </BackgroundAdd>
  );
};

Reseller.propTypes = {
  reseller: PropTypes.shape().isRequired,
  error: PropTypes.string.isRequired,
};

Reseller.getInitialProps = async (props) => {
  const { asPath } = props.ctx;

  const username = asPath.substring(10, asPath.length);

  try {
    const res = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/resellers/${username}`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return {
      reseller: data,
    };
  } catch (err) {
    return {
      error: 'Reseller not found',
    };
  }
};

export default Reseller;
