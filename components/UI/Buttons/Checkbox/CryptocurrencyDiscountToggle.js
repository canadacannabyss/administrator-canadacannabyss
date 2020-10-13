import React from 'react';
import {
  CheckboxDiv,
  CheckboxDivChecked
} from '../../../../styles/Components/UI/Buttons/Checkbox/AllowCustomersPurchaseOutOfStockCheckbox';

const CryptocurrencyDiscountToggleCheckbox = (props) => {
  const { handleCheckCryptocurrencyDiscount, cryptocurrencyDiscount } = props;

  const handleCryptocurrencyDiscount = () => {
    const toggle = handleCheckCryptocurrencyDiscount;
    toggle();
  };

  return (
    <>
      {cryptocurrencyDiscount ? (
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
              <label htmlFor='styled-checkbox-5' onClick={handleCryptocurrencyDiscount}>
                Discount on this cryptocurrency
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
              <label htmlFor='styled-checkbox-5' onClick={handleCryptocurrencyDiscount}>
              Discount on this cryptocurrency
              </label>
            </li>
          </ul>
        </CheckboxDiv>
      )}
    </>
  );
};

export default CryptocurrencyDiscountToggleCheckbox;
