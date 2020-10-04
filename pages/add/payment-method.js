import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import {
  FaBox, FaPlus, FaSpinner, FaCreditCard
} from 'react-icons/fa';
import { connect } from 'react-redux';
import _ from 'lodash';

import { slugifyString } from '../../utils/stringMethods';
import { roundFloatNumber } from '../../utils/numberConverter';

import WithAuth from '../../components/UI/withAuth/withAuth';
import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';

import {
  StickyDiv,
  MainGrid,
  Content,
  TitleSearchBarAddButtonDiv,
  TitleDiv,
  PlusIconSign,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
  Container,
  ContentContainer,
  Label,
  Input,
  Select,
  HalfGrid
} from '../../styles/Pages/Add/Product';
import {
  CryptoWalletDiv,
  InputWallet
} from '../../styles/Pages/Add/cryptocurrency/Cryptocurrency';

import {
  Wrapper
} from '../../styles/Pages/Banners/Banners';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

const AddPaymentMethod = (props) => {
  const { user } = props;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cryptocurrency');

  const [cryptocurrencies, setCryptocurrencies] = useState({});

  const [selectedCryptocurrencySymbol, setSelectedCryptocurrencySymbol] = useState('-');
  const [selectedCryptocurrencyWallet, setSelectedCryptocurrencyWallet] = useState('');
  const [selectedCryptocurrencyLogo, setSelectedCryptocurrencyLogo] = useState('');
  const [selectedCryptocurrencyName, setSelectedCryptocurrencyName] = useState('-');

  const [recipientEmail, setRecipientEmail] = useState('');

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const verifyCryptoSymbol = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/cryptocurrencies/validation/symbol/${selectedCryptocurrencySymbol}`,
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
    return data;
  };

  const verifyETransfer = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/e-transfers/validation/recipientEmail/${recipientEmail}`,
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
    return data;
  };

  useEffect(() => {
    const getCryptocurrencies = async () => {
      const res = await fetch(
        `${process.env.MAIN_API_ENDPOINT}/admin/cryptocurrencies/get/cryptocurrencies?limit=${50}&sort=cmc_rank`,
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
      setCryptocurrencies(data);
    };
    getCryptocurrencies();
  }, []);

  const createPaymentMethod = async (paymentMethodObj) => {
    let response;
    if (selectedPaymentMethod === 'cryptocurrency') {
      response = await fetch(
        `${process.env.MAIN_API_ENDPOINT}/admin/cryptocurrencies/create`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentMethodObj)
        }
      );
    } else if (selectedPaymentMethod === 'e-transfer') {
      response = await fetch(
        `${process.env.MAIN_API_ENDPOINT}/admin/e-transfers/create`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentMethodObj)
        }
      );
    }

    const data = await response.json();
    return data;
  };

  const onChangeSelectedPaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const onChangeSelectedCryptocurrency = (e) => {
    if (e.target.value === '-') {
      setSelectedCryptocurrencySymbol(e.target.value);
      setSelectedCryptocurrencyLogo('');
      setSelectedCryptocurrencyName(e.target.value);
      setSelectedCryptocurrencyWallet('');
    } else {
      setSelectedCryptocurrencySymbol(cryptocurrencies.data[e.target.value].symbol);
      setSelectedCryptocurrencyLogo(cryptocurrencies.data[e.target.value].logo);
      setSelectedCryptocurrencyName(cryptocurrencies.data[e.target.value].name);
      setSelectedCryptocurrencyWallet('');
    }
  };

  const onChangeSelectedCryptocurrencyWallet = (e) => {
    setSelectedCryptocurrencyWallet(e.target.value);
  };

  const onChangeRecipientEmail = (e) => {
    setRecipientEmail(e.target.value);
  };

  const disabledSubmitButton = () => {
    if (
      (selectedCryptocurrencySymbol.length > 0 &&
      selectedCryptocurrencyWallet.length > 0) || (recipientEmail.length > 0)
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    selectedCryptocurrencySymbol,
    selectedCryptocurrencyWallet,
    recipientEmail,
    selectedPaymentMethod,
    selectedCryptocurrencyWallet
  ]);

  const handleSubmit = async () => {
    let resValid;
    if (selectedPaymentMethod === 'cryptocurrency') {
      resValid = await verifyCryptoSymbol();
    } else if (selectedPaymentMethod === 'e-transfer') {
      resValid = await verifyETransfer();
    }
    console.log('resValid:', resValid);
    if (allFieldsFilled && resValid.valid) {
      const paymentMethodObj = {};
      if (selectedPaymentMethod === 'cryptocurrency') {
        paymentMethodObj.logo = selectedCryptocurrencyLogo;
        paymentMethodObj.symbol = selectedCryptocurrencySymbol;
        paymentMethodObj.name = selectedCryptocurrencyName;
        paymentMethodObj.address = selectedCryptocurrencyWallet;
        paymentMethodObj.admin = user.data._id;
      } else if (selectedPaymentMethod === 'e-transfer') {
        paymentMethodObj.recipient = recipientEmail;
        paymentMethodObj.admin = user.data._id;
      }
      const res = await createPaymentMethod(paymentMethodObj);
      if (res.ok) {
        Router.push('/payment-method');
      }
    }
  };

  return (
    <WithAuth>
      <Head>
        <title>Add Payment Method</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid>
            <Container>
              <ContentContainer>
                <Content>
                  <TitleSearchBarAddButtonDiv>
                    <TitleDiv>
                      <PlusIconSign>
                        <FaCreditCard className='mainIcon' />
                        <FaPlus className='plus' />
                      </PlusIconSign>
                      <h1>Add Payment Method</h1>
                    </TitleDiv>
                  </TitleSearchBarAddButtonDiv>
                  <HalfGrid>
                    <div>
                      <Label htmlFor='method'>Method</Label>
                      <Select id='method' onChange={onChangeSelectedPaymentMethod}>
                        <option value='cryptocurrency'>Cryptocurrency</option>
                        <option value='e-transfer'>e-Transfer</option>
                      </Select>
                    </div>
                    <div />
                  </HalfGrid>
                  <br />
                  {selectedPaymentMethod === 'cryptocurrency' && (
                    <HalfGrid>
                      <div>
                        <Label htmlFor='cryptoAsset'>Crypto Asset</Label>
                        <Select id='cryptoAsset' onChange={onChangeSelectedCryptocurrency}>
                          {!_.isEmpty(cryptocurrencies) && cryptocurrencies.data.length > 0 && (
                            <>
                              <option value='-'>------------</option>
                              {cryptocurrencies.data.map((cryptocurrency) => (
                                <option value={cryptocurrency.index}>{`${cryptocurrency.symbol} - ${cryptocurrency.name}`}</option>
                              ))}
                            </>
                          )}
                        </Select>
                      </div>
                      <div>
                        {selectedCryptocurrencyName !== '-' && (
                          <>
                            <Label htmlFor='selectedCrypto'>{`${selectedCryptocurrencyName} Wallet`}</Label>
                            <CryptoWalletDiv>
                              <span>
                                <img src={selectedCryptocurrencyLogo} alt='Cryptocurrency logo' />
                              </span>
                              <InputWallet id='selectedCrypto' onChange={onChangeSelectedCryptocurrencyWallet} value={selectedCryptocurrencyWallet} />
                            </CryptoWalletDiv>
                          </>
                        )}
                      </div>
                    </HalfGrid>
                  )}
                  {selectedPaymentMethod === 'e-transfer' && (
                  <HalfGrid>
                    <div>
                      <Label htmlFor='recipeintEmail'>Recipient email</Label>
                      <Input type='email' id='recipeintEmail' onChange={onChangeRecipientEmail} value={recipientEmail} />
                    </div>
                    <div />
                  </HalfGrid>
                  )}
                </Content>
              </ContentContainer>
            </Container>
          </MainGrid>
          <StickyDiv />
        </Wrapper>
        <SubmitButton type='button' onClick={handleSubmit}>
          Create Payment Method
        </SubmitButton>
      </BackgroundAdd>
    </WithAuth>
  );
};

AddPaymentMethod.propTypes = {
  user: PropTypes.shape().isRequired
};

export default connect(mapStateToProps)(AddPaymentMethod);
