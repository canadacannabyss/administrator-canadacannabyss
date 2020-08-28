import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  @media (max-width: 991px) {
    width: 90%;
  }
`;

export const ErrorMessageDiv = styled.div`
  width: 100%;
  margin: 50px 0;
  svg {
    display: table;
    margin: 0 auto;
    color: #777;
    font-size: 26px;
  }
  h1 {
    color: #777;
    font-size: 18px;
    text-align: center;
  }
`;
