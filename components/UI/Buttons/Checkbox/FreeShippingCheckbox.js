import React from 'react';
import {
  CheckboxDiv,
  CheckboxDivChecked,
} from '../../../../styles/Components/UI/Buttons/Checkbox/AllowCustomersPurchaseOutOfStockCheckbox';

const FreeShippingCheckbox = (props) => {
  const { handleCheckFreeShipping, freeShipping } = props;
  console.log('freeShipping:', freeShipping);

  const handleToggleFreeShipping = () => {
    const toggle = handleCheckFreeShipping;
    toggle();
  };

  return (
    <>
      {freeShipping ? (
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
                onClick={handleToggleFreeShipping}
              >
                Free Shipping
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
                onClick={handleToggleFreeShipping}
              >
                Free Shipping
              </label>
            </li>
          </ul>
        </CheckboxDiv>
      )}
    </>
  );
};

export default FreeShippingCheckbox;
