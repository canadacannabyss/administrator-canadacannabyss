import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
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
  BlurredBackground
} from '../styles/Pages/Login/Login';
import Logo from '../assets/img/canada-cannabyss-logo.svg';
import BackgroundImg from '../assets/img/bg-login.jpg';
import { fetchLoginAdminUser } from '../store/actions/user/user';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

const Login = (props) => {
  const { user } = props;

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userLoginSubmit, setUserLoginSubmit] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const disabledSubmitButton = () => {
    if (email.length > 0 && password.length > 0) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
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
        password
      };
      dispatch(fetchLoginAdminUser(userInfoObj));
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [email, password]);

  useEffect(() => {
    if (!_.isEmpty(user.data) && !user.loading && !user.error) {
      Router.push('/dashboard');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Login | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundLogin>
        <BlurredBackground bgImg={BackgroundImg}>
          <div />
        </BlurredBackground>
        <Container>
          <Form onSubmit={onSubmitLogin}>
            <BrandDiv>
              <img src={Logo} alt='Canada Cannabyss' />
              <div className='sep' />
              <h1>Login</h1>
            </BrandDiv>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' value={email} onChange={onChangeEmail} />
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              id='password'
              value={password}
              onChange={onChangePassword}
            />
            <Submit type='submit'>Login</Submit>
          </Form>
        </Container>
      </BackgroundLogin>
    </>
  );
};

export default connect(mapStateToProps)(withoutAdminAuth(Login));
