import React, { useState } from 'react';
import Link from 'next/link';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Head from 'next/head';
import { FaCreditCard, FaPlus, FaSearch } from 'react-icons/fa';
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
  Content,
  ListTitle
} from '../../styles/Pages/Products/Products';
import WithAuth from '../../components/UI/withAuth/withAuth';
import {
  getCryptocurrenciesPaymentMethods,
  getETransfersPaymentMethods
} from '../../store/actions/accepted-payment-methods/accepted-payment-methods';
import AcceptedCryptocurrenciesPaymentMethodsList from '../../components/UI/List/AcceptedPaymentMethod/AcceptedCryptocurrencyPaymentMethodList';
import AcceptedETransfersPaymentMethodsList from '../../components/UI/List/AcceptedPaymentMethod/AcceptedETransfersPaymentMethodList';
import DeleteCryptocurrencyConfirmation from '../../components/UI/Confirmations/DeleteCryptocurrencyPaymentMethodConfirmation';
import DeleteETransferConfirmation from '../../components/UI/Confirmations/DeleteETransferPaymentMethodConfirmation';

const mapStateToProps = (state) => {
  const {
    acceptedPaymentMethods
  } = state;

  return { acceptedPaymentMethods };
};

const PaymentMethod = (props) => {
  const { acceptedPaymentMethods } = props;

  const [selectedAcceptedPaymentCryptocurrencyId, setSelectedAcceptedPaymentCryptocurrencyId] = useState('');
  const [selectedAcceptedPaymentCryptocurrencyName, setSelectedAcceptedPaymentCryptocurrencyName] = useState('');
  const [toggleDeleteConfirmationCryptocurrency, setToggleDeleteConfirmationCryptocurrency] = useState(
    false
  );

  const [selectedAcceptedPaymentETransferId, setSelectedAcceptedPaymentETransferId] = useState('');
  const [selectedAcceptedPaymentETransferName, setSelectedAcceptedPaymentETransferName] = useState('');
  const [toggleDeleteConfirmationETransfer, setToggleDeleteConfirmationETransfer] = useState(
    false
  );

  const handleGetElementCryptocurrency = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedAcceptedPaymentCryptocurrencyId(element.id);
    setSelectedAcceptedPaymentCryptocurrencyName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmationCryptocurrency(true);
  };

  const handleGetElementETransfer = (el) => {
    const element = el.parentNode.parentNode;
    console.log(element.children[0].children[0].innerHTML);
    setSelectedAcceptedPaymentETransferId(element.id);
    setSelectedAcceptedPaymentETransferName(element.children[0].children[0].innerHTML);
    // console.log('element.querySelector(a):', element.querySelector('a'));
    setToggleDeleteConfirmationETransfer(true);
  };

  const handleCloseDeleteConfirmationCryptocurrency = () => {
    setToggleDeleteConfirmationCryptocurrency(false);
  };

  const handleCloseDeleteConfirmationETransfer = () => {
    setToggleDeleteConfirmationETransfer(false);
  };

  return (
    <WithAuth>
      <Head>
        <title>Accepted Payment Methods | Reseller - Canada Cannabyss</title>
      </Head>
      {toggleDeleteConfirmationCryptocurrency && (
        <DeleteCryptocurrencyConfirmation
          productId={selectedAcceptedPaymentCryptocurrencyId}
          productName={selectedAcceptedPaymentCryptocurrencyName}
          handleCloseDeleteConfirmation={handleCloseDeleteConfirmationCryptocurrency}
        />
      )}
      {toggleDeleteConfirmationETransfer && (
      <DeleteETransferConfirmation
        productId={selectedAcceptedPaymentETransferId}
        productName={selectedAcceptedPaymentETransferName}
        handleCloseDeleteConfirmation={handleCloseDeleteConfirmationETransfer}
      />
      )}
      <Background>
        <Wrapper>
          <Container>
            <ContentContainer>
              <Content>
                <TitleSearchBarAddButtonDiv>
                  <TitleDiv>
                    <FaCreditCard />
                    <h1>Accepted Payment Methods</h1>
                  </TitleDiv>
                  <SearchBarAddButtonDiv>
                    <SearchBar>
                      <input />
                      <button type='button'>
                        <FaSearch />
                      </button>
                    </SearchBar>
                    <Link href='/add/payment-method' as='/add/payment-method'>
                      <AddProductLink>
                        <FaPlus />
                      </AddProductLink>
                    </Link>
                  </SearchBarAddButtonDiv>
                </TitleSearchBarAddButtonDiv>
                {!_.isEmpty(acceptedPaymentMethods.data.cryptocurrencies) &&
                acceptedPaymentMethods.fetched &&
                !acceptedPaymentMethods.loading &&
                !acceptedPaymentMethods.error && (
                  <>
                    <ListTitle>Cryptocurencies</ListTitle>
                    <AcceptedCryptocurrenciesPaymentMethodsList
                      cryptocurrencies={acceptedPaymentMethods.data.cryptocurrencies}
                      handleGetElement={handleGetElementCryptocurrency}
                    />
                  </>
                )}
                <br />
                {!_.isEmpty(acceptedPaymentMethods.data.eTransfers) &&
                acceptedPaymentMethods.fetched &&
                !acceptedPaymentMethods.loading &&
                !acceptedPaymentMethods.error && (
                  <>
                    <ListTitle>e-Transfer Recipients</ListTitle>
                    <AcceptedETransfersPaymentMethodsList
                      eTransfers={acceptedPaymentMethods.data.eTransfers}
                      handleGetElement={handleGetElementETransfer}
                    />
                  </>
                )}
              </Content>
            </ContentContainer>
          </Container>
        </Wrapper>
      </Background>
    </WithAuth>
  );
};

PaymentMethod.propTypes = {
  acceptedPaymentMethods: PropTypes.shape().isRequired
};

PaymentMethod.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getCryptocurrenciesPaymentMethods());
  store.dispatch(getETransfersPaymentMethods());
};

export default connect(mapStateToProps)(PaymentMethod);
