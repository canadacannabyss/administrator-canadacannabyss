import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Container,
  BrandDiv,
  Form,
  Label,
  Input,
  Submit,
  BlurredBackground,
  HalfGrid,
  VerificationMsg,
  Warning,
  ErrorMsg,
} from '../../styles/Pages/Register/Register';
import { BackgroundLogin } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import Logo from '../../assets/img/canada-cannabyss-logo.svg';
import BackgroundImg from '../../assets/img/bg-register.jpg';

const Register = (props) => {
  const { token } = props;

  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const [loadingVerification, setLoadingVerification] = useState(false);
  const [fetchedVerification, setFetchedVerification] = useState(false);
  const [errorVerification, setErrorVerification] = useState(false);
  const [errorVerificationMsg, setErrorVerificationMsg] = useState('');
  const [verificationData, setVerificationData] = useState({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [userRegistrationSubmit, setUserRegistrationSubmit] = useState(false);
  const [isUserValid, setIsUserValid] = useState(true);
  const [isPasswordsMatching, setIsPasswordsMatching] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [errors, setErrors] = useState([]);

  const disabledSubmitButton = () => {
    if (
      username.length > 0 &&
      email.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0 &&
      password2.length > 0
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    if (userRegistrationSubmit) {
      Router.push('/login');
    }
  }, [userRegistrationSubmit]);

  useEffect(() => {
    if (!_.isEmpty(verificationData)) {
      setEmail(verificationData.email);
    }
  }, [verificationData]);

  useEffect(() => {
    setLoading(true);
    setLoadingVerification(true);
    const fetchVerifyResellerRegistrationToken = async () => {
      const response = await fetch(
        `${process.env.USER_API_ENDPOINT}/resellers/verify/registration/${token}`,
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
      if (data.error) {
        setErrorVerification(true);
        setErrorVerificationMsg(data.error);
      } else {
        setVerificationData(data);
        setFetchedVerification(true);
        setLoadingVerification(false);
        setErrorVerification(false);
      }
    };
    fetchVerifyResellerRegistrationToken();
  }, []);

  const fetchRegisterUser = async (userInfoObj) => {
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/resellers/register`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfoObj),
      }
    );
    const data = await response.json();
    console.log('data reseller user:', data);
    if (data.ok) {
      setUserRegistrationSubmit(true);
    }
  };

  const verifyUser = async () => {
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/resellers/verify/username/${username}`,
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
    return data;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    disabledSubmitButton();
    if (allFieldsFilled) {
      if (password !== password2) {
        setIsPasswordsMatching(false);
      } else {
        setIsPasswordsMatching(true);
        const res = await verifyUser(username);
        if (!res.valid) {
          setIsUserValid(false);
        } else {
          const registerInfo = {
            firstName,
            lastName,
            username,
            email,
            password,
            password2,
          };
          fetchRegisterUser(registerInfo);
        }
      }
    } else {
      setIsPasswordsMatching(false);
    }
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [firstName, lastName, username, email, password, password2]);

  return (
    <>
      <Head>
        <title>Register | Reseller - Canada Cannabyss</title>
      </Head>
      <BackgroundLogin>
        <BlurredBackground bgImg={BackgroundImg}>
          <div />
        </BlurredBackground>
        <Container>
          {errorVerification && errorVerificationMsg.length > 0 ? (
            <ErrorMsg>{errorVerificationMsg}</ErrorMsg>
          ) : (
            <>
              <VerificationMsg>
                <p>
                  You were invited to join our resellers team by{' '}
                  <span>
                    {loadingVerification &&
                      !fetchedVerification &&
                      !errorVerification &&
                      'Loading'}
                    {!loadingVerification &&
                      fetchedVerification &&
                      !errorVerification &&
                      !_.isEmpty(verificationData) &&
                      `${verificationData.createdBy.names.firstName} ${verificationData.createdBy.names.lastName}`}
                  </span>
                </p>
              </VerificationMsg>
              <Form method='post' onSubmit={handleRegistration}>
                <BrandDiv>
                  <img src={Logo} alt='Canada Cannabyss' />
                  <div className='sep' />
                  <h1>Register</h1>
                </BrandDiv>
                <HalfGrid>
                  <div>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      type='text'
                      id='firstName'
                      value={firstName}
                      onChange={handleFirstName}
                    />
                  </div>
                  <div>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      type='text'
                      id='lastName'
                      value={lastName}
                      onChange={handleLastName}
                    />
                  </div>
                </HalfGrid>
                <Label htmlFor='username'>Username</Label>
                <Input
                  type='text'
                  name='user'
                  id='username'
                  value={username}
                  autoComplete='off'
                  onChange={handleUsername}
                />
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  id='email'
                  value={email}
                  onChange={handleEmail}
                  disabled
                  className='disabled'
                />
                <Label htmlFor='password'>Password</Label>
                <Input
                  type='password'
                  id='password'
                  value={password}
                  onChange={handlePassword}
                />
                <Label htmlFor='password2'>Confirm Password</Label>
                <Input
                  type='password'
                  id='password2'
                  value={password2}
                  onChange={handlePassword2}
                />
                <Submit type='submit'>Register</Submit>
              </Form>
            </>
          )}
          {!isPasswordsMatching && <Warning>Passwords must match</Warning>}
          {!isUserValid && <Warning>This username is already taken</Warning>}
        </Container>
      </BackgroundLogin>
    </>
  );
};

Register.getInitialProps = async (props) => {
  const { isServer, asPath } = props.ctx;
  const token = asPath.substring(10, asPath.length);
  return { isServer, token };
};

Register.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Register;
