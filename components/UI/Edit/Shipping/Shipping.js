import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ContentContainer,
  Content,
  InputGroupTitle,
  WeightLabel,
  WeightDescription,
  WeightInput,
  WeightUnitSelect
} from '../../../../styles/Pages/Add/Product';
import PhysicalProduct from '../../Buttons/Checkbox/PhysicalProduct';

const Shipping = (props) => {
  const {
    handleWeightAmount, handleWeightUnit, physicalProduct, weightAmount, weightUnit, handleCheckPhysicalProduct
  } = props;

  return (
    <Container className='shipping'>
      <ContentContainer>
        <Content>
          <InputGroupTitle>Shipping</InputGroupTitle>
          <PhysicalProduct
            physicalProduct={physicalProduct}
            handleCheckPhysicalProduct={handleCheckPhysicalProduct}
          />
          <br />
          <WeightLabel htmlFor='weight'>Weight</WeightLabel>
          <WeightDescription>
            Used to calculate shipping rates at checkout and label prices during fulfillment.
          </WeightDescription>
          <WeightInput
            id='weight'
            type='number'
            min='0'
            step='0.1'
            autoComplete='off'
            value={weightAmount}
            onChange={handleWeightAmount}
          />
          <WeightUnitSelect onChange={handleWeightUnit}>
            <option value='kg'>kg</option>
            <option value='lbs'>lbs</option>
          </WeightUnitSelect>
        </Content>
      </ContentContainer>
    </Container>
  );
};

Shipping.propTypes = {
  handleCheckPhysicalProduct: PropTypes.func.isRequired,
  physicalProduct: PropTypes.bool.isRequired
};

export default Shipping;
