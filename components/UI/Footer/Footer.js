import React from 'react';

import {
  FooterWrapper,
  Copyright,
} from '../../../styles/Components/UI/Footer/Footer';

const Footer = () => {
  return (
    <FooterWrapper>
      <Copyright>
        {`© Copyright ${new Date().getFullYear()} Canada Cannabyss - All Rights Reserved`}
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
