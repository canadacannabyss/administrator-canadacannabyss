import React from 'react';
import PropTypes from 'prop-types';

import {
  InputGroupTitle
} from '../../../../styles/Pages/Add/Product';

import {
  Viewer,
  ViewerDiv,
  Container,
  Content,
  ContentContainer
} from '../../../../styles/Components/UI/Viewer/PaymentReceipt/PaymentReceipt';

const PaymentReceipt = (props) => {
  const { paymentReceipt } = props;

  return (
    <Container class='no-scrollbar'>
      <ContentContainer>
        <Content>
          <InputGroupTitle>Payment Receipt</InputGroupTitle>
          <Viewer>
            <ViewerDiv>
              <img src={paymentReceipt.url} alt='Payment Receipt' />
            </ViewerDiv>
          </Viewer>
        </Content>
      </ContentContainer>
    </Container>
  );
};

PaymentReceipt.propTypes = {
  paymentReceipt: PropTypes.shape().isRequired
};

export default PaymentReceipt;
