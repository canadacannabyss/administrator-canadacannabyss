import React from 'react';
import {
  CheckboxDiv,
  CheckboxDivChecked,
} from '../../../../styles/Components/UI/Buttons/Checkbox/TaxableProductCheckbox';

const AddProductCheckbox = (props) => {
  const { handleCheckTaxableProduct, taxableProduct } = props;

  const handleToggleTaxable = () => {
    const toggle = handleCheckTaxableProduct;
    toggle();
  };

  return (
    <>
      {taxableProduct ? (
        <CheckboxDivChecked>
          <ul className='unstyled centered'>
            <li>
              <input
                tabIndex='-1'
                className='styled-checkbox'
                id='styled-checkbox-1'
                type='checkbox'
                value='value1'
              />
              <label htmlFor='styled-checkbox-1' onClick={handleToggleTaxable}>
                Charge taxes on this product
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
                id='styled-checkbox-1'
                type='checkbox'
                value='value1'
              />
              <label htmlFor='styled-checkbox-1' onClick={handleToggleTaxable}>
                Charge taxes on this product
              </label>
            </li>
          </ul>
        </CheckboxDiv>
      )}
    </>
  );
};

export default AddProductCheckbox;
