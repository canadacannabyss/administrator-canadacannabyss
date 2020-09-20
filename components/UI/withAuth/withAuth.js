import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import _ from 'lodash';

const mapStateToProps = (state) => {
  const {
    user
  } = state;

  return { user };
};

const WithAuth = (props) => {
  const { user, children } = props;

  useEffect(() => {
    console.log('user wrapper:', user);
    if (!_.isEmpty(user.data)) {
      console.log('approved user');
    } else {
      console.log('disapproved user');
      Router.push('/');
    }
  }, [user]);

  return (
    <>
      {children}
    </>
  );
};

WithAuth.propTypes = {
  user: PropTypes.shape().isRequired,
  children: PropTypes.shape().isRequired
};

export default connect(mapStateToProps)(WithAuth);
