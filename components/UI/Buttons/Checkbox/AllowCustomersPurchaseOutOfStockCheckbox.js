import React from 'react';
import {
  CheckboxDiv,
  CheckboxDivChecked,
} from '../../../../styles/Components/UI/Buttons/Checkbox/AllowCustomersPurchaseOutOfStockCheckbox';

const AllowCustomersPurchaseOutOfStockCheckbox = (props) => {
  const { handleCheckAllowPurchaseOutOfStock, allowPurchaseOutOfStock } = props;

  const handleToggleAllowPurchaseOutOfStock = () => {
    const toggle = handleCheckAllowPurchaseOutOfStock;
    toggle();
  };

  return (
    <>
      {allowPurchaseOutOfStock ? (
        <CheckboxDivChecked>
          <ul className='unstyled centered'>
            <li>
              <input
                tabIndex='-1'
                className='styled-checkbox'
                id='styled-checkbox-5'
                type='checkbox'
                value='value5'
              />
              <label
                htmlFor='styled-checkbox-5'
                onClick={handleToggleAllowPurchaseOutOfStock}
              >
                Allow customers to purchase this product when it's out of stock
              </label>
            </li>
          </ul>
        </CheckboxDivChecked>
      ) : (
        <CheckboxDiv>
          <ul className='unstyled centered'>
            <li>
              <input
                tabIndex='-1'
                className='styled-checkbox'
                id='styled-checkbox-5'
                type='checkbox'
                value='value5'
              />
              <label
                htmlFor='styled-checkbox-5'
                onClick={handleToggleAllowPurchaseOutOfStock}
              >
                Allow customers to purchase this product when it's out of stock
              </label>
            </li>
          </ul>
        </CheckboxDiv>
      )}
    </>
  );
};

export default AllowCustomersPurchaseOutOfStockCheckbox;
