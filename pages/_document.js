import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Font from '../utils/fontLoader';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  componentDidMount() {
    Font();
  }

  render() {
    return (
      <html lang='en-ca'>
        <Head>
          {process.env.NODE_ENV !== 'production' && (
            <link
              rel='stylesheet'
              type='text/css'
              href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
            />
          )}
          <link
            href='https://fonts.googleapis.com/css?family=Montserrat&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
