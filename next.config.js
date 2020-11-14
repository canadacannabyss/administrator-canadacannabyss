const withImage = require('next-images');
const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const {
  serverRuntimeConfig,
  publicRuntimeConfig,
} = require('./next.runtimeConfig');

module.exports = withImage(
  withCSS(
    withSASS({
      cssModules: true,
      serverRuntimeConfig,
      publicRuntimeConfig,
      target: "serverless",
      webpack: (config, { isServer }) => {
        if (isServer) {
          require('./scripts/generate-sitemap');
        }
        return config;
      },
      env: {
        USER_API_ENDPOINT: process.env.USER_API_ENDPOINT,
        MAIN_API_ENDPOINT: process.env.MAIN_API_ENDPOINT,
        MAIN_DOMAIN: process.env.MAIN_DOMAIN,
        SECURED_MAIN_DOMAIN: process.env.SECURED_MAIN_DOMAIN,
        STORE_MAIN_DOMAIN: process.env.STORE_MAIN_DOMAIN,
      },
    })
  )
);
