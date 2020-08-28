import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 12px 14px;
  background: #18840f33;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Copyright = styled.p`
  color: #18840f;
  font-size: 14px;
  @media (max-width: 440px) {
    font-size: 13px;
  }
`;

export { FooterWrapper, Copyright };
