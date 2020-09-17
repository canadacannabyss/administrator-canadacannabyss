import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Container,
  ContentContainer,
  Content,
  HalfGrid,
  Label,
  InputGroupTitle,
  Input,
  Select
} from '../../../../styles/Pages/Add/Product';

const ResellerSelector = ({ resellers, onChangeSelectReseller }) => (
  <Container>
    <ContentContainer>
      <Content>
        <InputGroupTitle>Reseller</InputGroupTitle>
        <HalfGrid>
          <div>
            <Label>Reseller</Label>
            <Select onChange={onChangeSelectReseller}>
              <>
                <option>-----------------------</option>
                {!_.isEmpty(resellers.data) && resellers.fetched && !resellers.loading && !resellers.error && (
                <>
                  {resellers.data.map((reseller) => (
                    <option value={reseller._id}>

                      {`${reseller._id} - ${reseller.names.firstName} ${reseller.names.lastName}`}
                    </option>
                  ))}
                </>
                )}
              </>
            </Select>
          </div>
          <div />
        </HalfGrid>
      </Content>
    </ContentContainer>
  </Container>
);

ResellerSelector.propTypes = {
  resellers: PropTypes.shape().isRequired,
  onChangeSelectReseller: PropTypes.func.isRequired
};

export default ResellerSelector;
