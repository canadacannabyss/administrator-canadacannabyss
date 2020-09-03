import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ContentContainer,
  Content,
  HalfGrid,
  Label,
  InputGroupTitle,
  Input
} from '../../../../styles/Pages/Add/Product';
import AllowCustomersPurchaseOutOfStockCheckbox from '../../Buttons/Checkbox/AllowCustomersPurchaseOutOfStockCheckbox';

const Inventory = (props) => {
  const {
    handleSku,
    handleBarcode,
    handleQuantity,
    allowPurchaseOutOfStock,
    sku,
    barcode,
    quantity,
    handleCheckAllowPurchaseOutOfStock
  } = props;

  return (
    <Container className='inventory'>
      <ContentContainer>
        <Content>
          <InputGroupTitle>Inventory</InputGroupTitle>
          <HalfGrid>
            <div>
              <Label htmlFor='sku'>SKU (stock keeping unit)</Label>
              <br />
              <Input
                id='sku'
                type='text'
                autoComplete='off'
                value={sku}
                onChange={handleSku}
              />
            </div>
            <div>
              <Label htmlFor='barcode'>Barcode (ISBN, UPC, GTIN, etc.)</Label>
              <Input
                id='barcode'
                type='text'
                autoComplete='off'
                value={barcode}
                onChange={handleBarcode}
              />
            </div>
          </HalfGrid>
          <br />
          <HalfGrid>
            <div>
              <Label htmlFor='quantity'>Quantity</Label>
              <br />
              <Input
                id='quantity'
                type='number'
                min='1'
                step='1'
                value={quantity}
                onChange={handleQuantity}
              />
            </div>
          </HalfGrid>
          <br />
          <AllowCustomersPurchaseOutOfStockCheckbox
            allowPurchaseOutOfStock={allowPurchaseOutOfStock}
            handleCheckAllowPurchaseOutOfStock={handleCheckAllowPurchaseOutOfStock}
          />
        </Content>
      </ContentContainer>
    </Container>
  );
};

Inventory.propTypes = {
  handleSku: PropTypes.func.isRequired,
  handleBarcode: PropTypes.func.isRequired,
  handleQuantity: PropTypes.func.isRequired,
  handleCheckAllowPurchaseOutOfStock: PropTypes.func.isRequired,
  allowPurchaseOutOfStock: PropTypes.bool.isRequired
};

export default Inventory;
