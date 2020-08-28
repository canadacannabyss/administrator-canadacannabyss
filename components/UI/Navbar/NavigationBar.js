import React, { useState } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Logo from '../../../assets/img/canada-cannabyss-logo.svg';
// import OutsideAlerter from '../../../utils/OutsideAlerter';

import UserMenu from './Tabs/UserMenu/UserMenu';

import {
  Navbar,
  NavbarWrapper,
  Brand,
  UserDiv,
  User,
  LoginLink
} from '../../../styles/Components/UI/Navbar/Navbar';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

const NavigationBar = (props) => {
  const { user } = props;

  const router = useRouter();
  const [toggleUserMenu, setToggleUserMenu] = useState(false);

  const onClickUserButton = () => {
    setToggleUserMenu(!toggleUserMenu);
  };

  return (
    <>
      <Navbar>
        <NavbarWrapper>
          {!_.isEmpty(user.data) && !user.loading && !user.error ? (
            <Link href="/dashboard" as="/dashboard">
              <Brand>
                <img src={Logo} alt="Canada Cannabyss Reseller" />
                <p>
                  Canada <br />
                  <span>Cannabyss</span>
                </p>
                <div className="sep" />
                <h1>Administrator</h1>
              </Brand>
            </Link>
          ) : (
            <Link href="/" as="/">
              <Brand>
                <img src={Logo} alt="Canada Cannabyss Reseller" />
                <p>
                  Canada <br />
                  <span>Cannabyss</span>
                </p>
                <div className="sep" />
                <h1>Administrator</h1>
              </Brand>
            </Link>
          )}
          {router.asPath !== '/login' &&
            !router.asPath.includes('/confirmation/') &&
            !router.asPath.includes('/register/') &&
            !_.isEmpty(user.data) &&
            !user.loading &&
            !user.error && (
              <UserDiv>
                <User
                  onClick={() => {
                    onClickUserButton();
                  }}
                  img={user.data.profileImage.url}
                />
              </UserDiv>
            )}
          {_.isEmpty(user.data) && (
            <Link href="/login" as="/login">
              <LoginLink>Login</LoginLink>
            </Link>
          )}
        </NavbarWrapper>
      </Navbar>
      {toggleUserMenu && (
        // <OutsideAlerter>
        <UserMenu onClickUserButton={onClickUserButton} />
        // </OutsideAlerter>
      )}
    </>
  );
};

export default connect(mapStateToProps)(NavigationBar);
