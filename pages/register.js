import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { BackgroundLogin } from '../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  Container,
  BrandDiv,
  Form,
  Label,
  Input,
  Submit,
  BlurredBackground,
  Warning,
  HalfGrid
} from '../styles/Pages/RegisterAdmin/RegisterAdmin';
import Logo from '../assets/img/canada-cannabyss-logo.svg';
import BackgroundImg from '../assets/img/bg-register-admin.jpg';

const Register = () => {
  const [isSU, setIsSU] = useState(false);

  const [error, setError] = useState(false);
  const [isAdminUserValid, setIsAdminUserValid] = useState(true);
  const [isPasswordsMatching, setIsPasswordsMatching] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [warning, setWarning] = useState(false);

  const [suUsername, setSuUsername] = useState('');
  const [suPassword, setSuPassword] = useState('');

  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminLastName, setAdminLastName] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPassword2, setAdminPassword2] = useState('');

  const disabledSubmitButton = () => {
    if (
      adminUsername.length > 0 &&
      adminEmail.length > 0 &&
      adminFirstName.length > 0 &&
      adminLastName.length > 0 &&
      adminPassword.length > 0 &&
      adminPassword2.length > 0
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  const [
    adminUserRegistrationSubmit,
    setAdminUserRegistrationSubmit
  ] = useState(false);

  useEffect(() => {
    if (adminUserRegistrationSubmit) {
      Router.push('/login');
    }
  }, [adminUserRegistrationSubmit]);

  useEffect(() => {
    disabledSubmitButton();
  }, [
    adminFirstName,
    adminLastName,
    adminUsername,
    adminEmail,
    adminPassword,
    adminPassword2
  ]);

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'users',
      title: adminUsername
    };
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/auth/set/global-variable`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyRequest)
      }
    );
    return response;
  };

  const verifyAdminUser = async () => {
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/auth/verify/admin/username/${adminUsername}`,
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
    const data = await response.json();
    return data;
  };

  const LoginSU = async (userInfo) => {
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/auth/verify/su`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      }
    );
    const data = await response.json();
    return data;
  };

  const fetchRegisterAdminUser = async (userInfoObj) => {
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/auth/register`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfoObj)
      }
    );
    const data = await response.json();
    console.log('data admin suUsername:', data);
    if (data.ok) {
      setAdminUserRegistrationSubmit(true);
    }
  };

  const onChangeSuUsername = (e) => {
    setSuUsername(e.target.value);
  };

  const onChangeSuPassword = (e) => {
    setSuPassword(e.target.value);
  };

  const onChangeAdminFirstName = (e) => {
    setAdminFirstName(e.target.value);
  };

  const onChangeAdminLastName = (e) => {
    setAdminLastName(e.target.value);
  };

  const onChangeAdminUsername = (e) => {
    setAdminUsername(e.target.value);
  };

  const onChangeAdminEmail = (e) => {
    setAdminEmail(e.target.value);
  };

  const onChangeAdminPassword = (e) => {
    setAdminPassword(e.target.value);
  };

  const onChangeAdminPassword2 = (e) => {
    setAdminPassword2(e.target.value);
  };

  const handleLoginSU = async (e) => {
    e.preventDefault();
    const userInfo = {
      username: suUsername,
      password: suPassword
    };
    const res = await LoginSU(userInfo);
    setIsSU(res.isSU);
    if (!isSU) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (
      adminPassword === adminPassword2 &&
      adminPassword.length > 0 &&
      adminPassword2.length > 0 &&
      adminFirstName.length > 0 &&
      adminLastName.length > 0 &&
      adminUsername.length > 0 &&
      adminEmail.length > 0
    ) {
      setIsPasswordsMatching(true);
      const res = await verifyAdminUser(adminUsername);
      if (!res.valid) {
        setIsAdminUserValid(false);
      } else {
        const adminRegisterInfo = {
          firstName: adminFirstName,
          lastName: adminLastName,
          username: adminUsername,
          email: adminEmail,
          password: adminPassword,
          password2: adminPassword2
        };
        fetchRegisterAdminUser(adminRegisterInfo);
      }
    } else {
      setIsPasswordsMatching(false);
    }
  };

  useEffect(() => {
    setGlobalVariable();
  }, [adminUsername]);

  return (
    <>
      <Head>
        <title>Register | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundLogin>
        <BlurredBackground bgImg={BackgroundImg}>
          <div />
        </BlurredBackground>
        <Container isSU={isSU}>
          {isSU ? (
            <Form onSubmit={handleRegistration}>
              <BrandDiv>
                <img src={Logo} alt='Canada Cannabyss' />
                <div className='sep' />
                <h1>Administrator</h1>
              </BrandDiv>
              <HalfGrid>
                <div>
                  <Label
                    htmlFor='adminFirstName'
                  >
                    First Name
                  </Label>
                  <Input
                    type='text'
                    id='adminFirstName'
                    value={adminFirstName}
                    onChange={onChangeAdminFirstName}
                  />
                </div>
                <div>
                  <Label
                    htmlFor='adminLastName'
                  >
                    Last Name
                  </Label>
                  <Input
                    type='text'
                    id='adminLastName'
                    value={adminLastName}
                    onChange={onChangeAdminLastName}
                  />
                </div>
              </HalfGrid>
              <Label
                htmlFor='adminUsername'
              >
                Username
              </Label>
              <Input
                type='text'
                id='adminUsername'
                value={adminUsername}
                onChange={onChangeAdminUsername}
              />
              <Label
                htmlFor='adminEmail'
              >
                Email
              </Label>
              <Input
                type='email'
                id='adminEmail'
                value={adminEmail}
                onChange={onChangeAdminEmail}
              />
              <Label
                htmlFor='adminPassword'
              >
                Password
              </Label>
              <Input
                type='password'
                id='adminPassword'
                value={adminPassword}
                onChange={onChangeAdminPassword}
              />
              <Label
                htmlFor='adminPassword2'
              >
                Confirm Password
              </Label>
              <Input
                type='password'
                id='adminPassword2'
                value={adminPassword2}
                onChange={onChangeAdminPassword2}
              />
              {!isPasswordsMatching && <Warning>Passwords must match</Warning>}
              {!isAdminUserValid && (
                <Warning>This username is already taken</Warning>
              )}
              <Submit type='submit'>Register</Submit>
            </Form>
          ) : (
            <Form onSubmit={handleLoginSU}>
              <BrandDiv>
                <img src={Logo} alt='Canada Cannabyss' />
                <div className='sep' />
                <h1>Super User</h1>
              </BrandDiv>
              <Label
                htmlFor='suUsername'
              >
                Username
              </Label>
              <Input
                type='text'
                id='suUsername'
                value={suUsername}
                onChange={onChangeSuUsername}
              />
              <Label
                htmlFor='password'
              >
                Password
              </Label>
              <Input
                type='password'
                id='password'
                value={suPassword}
                onChange={onChangeSuPassword}
              />
              {error && (
              <>
                <Warning>Not a Super User</Warning>
              </>
              )}
              <Submit type='submit'>Login</Submit>
            </Form>
          )}
        </Container>
      </BackgroundLogin>
    </>
  );
};

export default Register;
