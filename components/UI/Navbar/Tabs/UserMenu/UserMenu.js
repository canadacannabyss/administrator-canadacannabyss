import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { logoutUser } from '../../../../../store/actions/user/user';
import { Container, LinkTo, SignOut } from '../../../../../styles/Components/UI/Navbar/Tabs/UserMenu/UserMenu';

const UserMenu = (props) => {
  const { onClickUserButton } = props;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <Container>
      <Link href='/account' as='/account'>
        <LinkTo
          onClick={() => {
            onClickUserButton();
          }}
        >
          Account
        </LinkTo>
      </Link>
      <SignOut
        onClick={() => {
          handleLogout();
        }}
      >
        Sign out
      </SignOut>
    </Container>
  );
};

UserMenu.propTypes = {
  onClickUserButton: PropTypes.func.isRequired
};

export default UserMenu;
