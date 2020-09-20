import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, connect } from 'react-redux';
import { withoutAdminAuth } from '../../utils/withoutAdminAuth';
import { BackgroundLogin } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  Container,
  BrandDiv,
  Form,
  Label,
  Input,
  Submit,
  BlurredBackground,
  SwitchFormButton,
  Warning,
} from '../../styles/Pages/Login/Login';
import Logo from '../../assets/img/canada-cannabyss-logo.svg';
import BackgroundImg from '../../assets/img/bg-login.jpg';

const ResetPassword = ({ token }) => {
  const [user, setUser] = useState({});

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [successPasswordUpdated, setSuccessPasswordUpdated] = useState(false);

  useEffect(() => {
    const fetchValidationToken = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.USER_API_ENDPOINT}/admin/auth/reset-password/validating/token/${token}`,
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
        setServerErrorMessage(data.error);
      }
      if (data.notValid) {
        setWarning(true);
        setInvalid(true);
        setServerErrorMessage(data.notValid);
      }
      setLoading(false);
    };
    fetchValidationToken();
  }, []);

  const fetchUpdatePassword = async () => {
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/auth/reset-password`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password, password2 }),
      }
    );
    const data = await response.json();
    console.log('updatedPassword:', data);
    if (data.ok) {
      setSuccessPasswordUpdated(true);
    }
    if (data.error) {
      setWarning(true);
      setError(true);
      setServerErrorMessage(data.error);
    }
    return data;
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSendResetPasswordEmail = async (e) => {
    e.preventDefault();
    fetchUpdatePassword();
  };

  return (
    <>
      <Head>
        <title>Reset Password | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundLogin>
        <BlurredBackground bgImg={BackgroundImg}>
          <div />
        </BlurredBackground>
        <Container>
          {loading && <h4>Loading</h4>}
          {warning && error && serverErrorMessage === 'This link is expired' && (
            <>
              <p>This link is expired</p>
            </>
          )}
          {warning &&
            invalid &&
            serverErrorMessage === 'This link is not valid' && (
              <>
                <p>This link is not valid</p>
              </>
            )}
          {success && !successPasswordUpdated && !_.isEmpty(user) && (
            <Form method='post' onSubmit={handleSendResetPasswordEmail}>
              <BrandDiv>
                <img src={Logo} alt='Canada Cannabyss' />
                <div className='sep' />
                <h1>Reset Password</h1>
              </BrandDiv>
              <Label htmlFor='password'>New Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                value={password}
                autoComplete='off'
                onChange={handlePassword}
              />
              <Label htmlFor='password'>Confirm New Password</Label>
              <Input
                type='password'
                name='password2'
                id='password2'
                value={password2}
                autoComplete='off'
                onChange={handlePassword2}
              />
              {warning &&
                error &&
                serverErrorMessage === 'Passwords does not match.' && (
                  <Warning>
                    <p>Passwords does not match</p>
                  </Warning>
                )}
              <Submit className='resetPassword' type='submit'>
                Reset Password
              </Submit>
            </Form>
          )}
          {successPasswordUpdated && (
            <>
              <p>Your password was successfully updated.</p>
            </>
          )}
        </Container>
      </BackgroundLogin>
    </>
  );
};

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired,
};

ResetPassword.getInitialProps = async ({ ctx }) => {
  const { asPath } = ctx;

  const token = asPath.substring(16, asPath.length);

  return {
    token,
  };
};

export default ResetPassword;
