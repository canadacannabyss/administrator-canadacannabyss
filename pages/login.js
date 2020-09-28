import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import _ from 'lodash';
import { useDispatch, connect } from 'react-redux';
import { withoutAdminAuth } from '../utils/withoutAdminAuth';
import { BackgroundLogin } from '../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  Container,
  BrandDiv,
  Form,
  Label,
  Input,
  Submit,
  BlurredBackground,
  EmailSentToMessage,
  SwitchFormButton,
  FormLinkTo,
  Warning,
} from '../styles/Pages/Login/Login';
import Logo from '../assets/img/canada-cannabyss-logo.svg';
import BackgroundImg from '../assets/img/bg-login.jpg';
import { fetchLoginAdminUser, resetPassword } from '../store/actions/user/user';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user,
  };
};

const Login = (props) => {
  const { user } = props;

  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState(true);
  const [resetPasswordForm, setResetPasswordForm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userLoginSubmit, setUserLoginSubmit] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [
    allFieldsFilledResetPassword,
    setAllFieldsFilledResetPassword,
  ] = useState(false);

  const [resetPasswordSent, setResetPasswordSent] = useState(false);

  const disabledSubmitButton = () => {
    if (email.length > 0 && password.length > 0) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  const disabledResetPasswordSubmitButton = () => {
    if (email.length > 0) {
      setAllFieldsFilledResetPassword(true);
    } else {
      setAllFieldsFilledResetPassword(false);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    disabledSubmitButton();
    if (allFieldsFilled) {
      const userInfoObj = {
        email,
        password,
      };
      dispatch(fetchLoginAdminUser(userInfoObj));
    }
  };

  const onSubmitResetPassword = (e) => {
    e.preventDefault();
    disabledResetPasswordSubmitButton();
    if (allFieldsFilledResetPassword) {
      dispatch(resetPassword(email));
      setResetPasswordSent(true);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [email, password]);

  useEffect(() => {
    disabledResetPasswordSubmitButton();
  }, [email]);

  useEffect(() => {
    if (!_.isEmpty(user.data) && !user.loading && !user.error) {
      Router.push('/dashboard');
    }
  }, [user]);

  const onClickLoginFormButton = () => {
    setLoginForm(true);
    setResetPasswordForm(false);
  };

  const onClickResetPasswordForm = () => {
    setResetPasswordForm(true);
    setLoginForm(false);
  };

  return (
    <>
      <Head>
        <title>Login | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundLogin>
        <BlurredBackground bgImg={BackgroundImg}>
          <div />
        </BlurredBackground>
        {resetPasswordSent && !user.loading && !user.fetched && !user.error && (
          <EmailSentToMessage top='20px'>
            <p>
              An account verification link has been sent to <span>{email}</span>
            </p>
          </EmailSentToMessage>
        )}
        <Container>
          {loginForm && (
            <Form onSubmit={onSubmitLogin}>
              <BrandDiv>
                <img src={Logo} alt='Canada Cannabyss' />
                <div className='sep' />
                <h1>Login</h1>
              </BrandDiv>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                value={email}
                onChange={onChangeEmail}
              />
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                id='password'
                value={password}
                onChange={onChangePassword}
                autoComplete='current-password'
              />
              <Submit type='submit'>Login</Submit>
            </Form>
          )}
          {resetPasswordForm && (
            <Form onSubmit={onSubmitResetPassword}>
              <BrandDiv>
                <img src={Logo} alt='Canada Cannabyss' />
                <div className='sep' />
                <h1>Reset Password</h1>
              </BrandDiv>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                value={email}
                onChange={onChangeEmail}
                autoComplete='current-password'
              />
              <Submit type='submit'>Reset Password</Submit>
            </Form>
          )}
          {loginForm && (
            <>
              <SwitchFormButton
                onClick={() => {
                  onClickResetPasswordForm();
                }}
              >
                Reset Password
              </SwitchFormButton>
              <Link href='/register' as='/register'>
                <FormLinkTo>Don't have an account yet?</FormLinkTo>
              </Link>
            </>
          )}
          {resetPasswordForm && (
            <SwitchFormButton
              onClick={() => {
                onClickLoginFormButton();
              }}
            >
              Already have an account?
            </SwitchFormButton>
          )}
          {resetPasswordForm &&
            user.error &&
            !user.loading &&
            !user.fetched && <Warning>Account not found.</Warning>}
        </Container>
      </BackgroundLogin>
    </>
  );
};

export default connect(mapStateToProps)(withoutAdminAuth(Login));
