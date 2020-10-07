/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Content } from '../styles/Layout';
import { PageContainer } from '../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import Navbar from './UI/Navbar/NavigationBar';
import Footer from './UI/Footer/Footer';
import Sidebar from './UI/Sidebar/Sidebar';

import { fetchLoginAdminUser } from '../store/actions/user/user';

const mapStateToProps = (state) => {
  const {
    user,
    cart,
    order,
    loginRequestCount
  } = state;

  return {
    user,
    cart,
    order,
    loginRequestCount
  };
};

let count = 0;

const Layout = (props) => {
  const { children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (count === 0) {
      dispatch(fetchLoginAdminUser());
      count += 1;
    }
  }, []);

  return (
    <div
      className='Layout'
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <Navbar />
      <PageContainer>
        <Sidebar />
        {children}
      </PageContainer>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default connect(mapStateToProps)(Layout);
