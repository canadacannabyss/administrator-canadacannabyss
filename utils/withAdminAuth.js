import _ from 'lodash';
import React, { Component } from 'react';
import redirect from './redirect';

export const withAdminAuth = (C) => class AuthComponent extends Component {
  static async getInitialProps(props) {
    const { store, isServer, asPath } = props.ctx;
    const state = store.getState();
    const userInfo = state.user;
    console.log('userInfo:', userInfo);
    if (_.isEmpty(userInfo.data)) {
      redirect(props.ctx, '/');
    } else if (!userInfo.data.isAdmin) {
      redirect(props.ctx, '/');
    }
    return { isServer, asPath, userInfo };
  }

  render() {
    return <C {...this.props} />;
  }
};
