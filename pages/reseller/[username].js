import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import _ from 'lodash';
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
import { getReseller } from '../../store/actions/reseller/reseller';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { reseller } = state;

  return {
    reseller,
  };
};

const Reseller = (props) => {
  const { reseller, error } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (
      !_.isEmpty(reseller.data) &&
      reseller.fetched &&
      !reseller.loading &&
      !reseller.error
    ) {
      setFirstName(reseller.data.names.firstName);
      setLastName(reseller.data.names.lastName);
    }
  }, [reseller]);

  return (
    <WithAuth>
      <BackgroundAdd>
        <Head>
          <title>Reseller | Administrator - Canada Cannabyss</title>
        </Head>
        <Container>
          <ContentContainer>
            <Content>
              <TitleSearchBarAddButtonDiv>
                {!_.isEmpty(reseller.data) &&
                  reseller.fetched &&
                  !reseller.loading &&
                  !reseller.error && (
                    <>
                      <TitleDiv>
                        <h1>{`${firstName} ${lastName}`}</h1>
                      </TitleDiv>
                    </>
                  )}
              </TitleSearchBarAddButtonDiv>
            </Content>
          </ContentContainer>
        </Container>
      </BackgroundAdd>
    </WithAuth>
  );
};

Reseller.propTypes = {
  reseller: PropTypes.shape().isRequired,
  error: PropTypes.string.isRequired,
};

Reseller.getInitialProps = async ({ ctx }) => {
  const { asPath, store } = ctx;

  const username = asPath.substring(10, asPath.length);

  store.dispatch(getReseller(username));
};

export default connect(mapStateToProps)(Reseller);
