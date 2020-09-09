/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import Logo from '../assets/img/canada-cannabyss-logo.svg';
import Layout from '../components/Layout';
import '../styles/_app.css';
import createStore from '../store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    const { store } = ctx;

    return { pageProps, store };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Head>
          <link rel='icon' type='image/png' href={Logo} />
          <meta charset='utf-8' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
