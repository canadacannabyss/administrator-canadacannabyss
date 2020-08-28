import React from 'react';
import { FaSadCry } from 'react-icons/fa';
import { Wrapper, ErrorMessageDiv } from '../styles/Pages/Error/Error';

const Page404 = () => {
  return (
    <Wrapper>
      <ErrorMessageDiv>
        <FaSadCry />
        <h1>Something went wrong.</h1>
      </ErrorMessageDiv>
    </Wrapper>
  );
};

export default Page404;
