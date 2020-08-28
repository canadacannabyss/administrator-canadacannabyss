import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import _ from 'lodash';
import { BackgroundLogin } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  Wrapper,
  Title,
  ConfirmationMessage,
  ConfirmationMessageError,
  Loading,
  LoadingSpinner,
  BlurredBackground,
  BrandDiv,
  Container,
  Form,
  Input,
  Label,
  Submit,
} from '../../styles/Pages/Confirmation/Confirmation';
import BackgroundImg from '../../assets/img/bg-confirmation.jpg';
import Logo from '../../assets/img/canada-cannabyss-logo.svg';

const Confirmation = (props) => {
  const { token } = props;
  const [user, setUser] = useState({});
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  useEffect(() => {
    const fetchConfirmAccount = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.USER_API_ENDPOINT}/admin/auth/confirmation/${token}`,
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
      const data = await response.json();

      if (data._id) {
        setSuccess(true);
        setUser(data);
      }
      if (data.error) {
        setWarning(true);
        setError(true);
      }
      if (data.notValid) {
        setWarning(true);
        setInvalid(true);
      }
      setLoading(false);
    };
    fetchConfirmAccount();
  }, []);

  return (
    <>
      <Head>
        <title>Account Confirmation | Reseller - Canada Cannabyss</title>
      </Head>
      <BackgroundLogin>
        <BlurredBackground bgImg={BackgroundImg}>
          <div />
        </BlurredBackground>
        <Container>
          {loading && (
            <Loading>
              <LoadingSpinner>
                <FaSpinner />
              </LoadingSpinner>
            </Loading>
          )}
          {warning && error && (
            <ConfirmationMessageError>
              <p>This link is expired</p>
            </ConfirmationMessageError>
          )}
          {warning && invalid && (
            <ConfirmationMessageError>
              <p>This link is not valid</p>
            </ConfirmationMessageError>
          )}
          {success && !_.isEmpty(user) && (
            <>
              <p>
                Welcome to Canada Cannabyss{' '}
                <span>{`${user.names.firstName} ${user.names.lastName}`}</span>
              </p>
              <br />
              <p>Your Account has been successfully verified.</p>
            </>
          )}
        </Container>
      </BackgroundLogin>
    </>
  );
};

Confirmation.getInitialProps = async (props) => {
  const { isServer, asPath } = props.ctx;
  const token = asPath.substring(14, asPath.length);

  return { isServer, token };
};

Confirmation.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Confirmation;
