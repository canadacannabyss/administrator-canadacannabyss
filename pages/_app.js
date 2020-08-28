/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import Logo from '../assets/img/canada-cannabyss-logo.svg';
import Layout from '../components/Layout';
import '../styles/_app.css';
import { wrapper } from '../store/index';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link rel='icon' type='image/png' href={Logo} />
          <meta charset='utf-8' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
