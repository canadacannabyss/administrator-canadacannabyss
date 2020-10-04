import styled from 'styled-components';

export const CryptoWalletDiv = styled.div`
  span {
    position: absolute;
    transform: translate(5px, 7px);
    img {
      height: 25px;
      width: 25px;
    }
  }
`;

export const InputWallet = styled.input`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding-left: 35px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: #fff;
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
`;
