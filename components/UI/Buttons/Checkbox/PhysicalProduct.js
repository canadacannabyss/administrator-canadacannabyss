import React from 'react';
import {
  CheckboxDiv,
  CheckboxDivChecked,
} from '../../../../styles/Components/UI/Buttons/Checkbox/PhysicalProduct';

const PhysicalProduct = (props) => {
  const { handleCheckPhysicalProduct, physicalProduct } = props;

  const handleTogglePhysicalProduct = () => {
    const toggle = handleCheckPhysicalProduct;
    toggle();
  };

  return (
    <>
      {physicalProduct ? (
        <CheckboxDivChecked>
          <ul className='unstyled centered'>
            <li>
              <input
                tabIndex='-1'
                className='styled-checkbox'
                id='styled-checkbox-6'
                type='checkbox'
                value='value5'
              />
              <label
                htmlFor='styled-checkbox-6'
                onClick={handleTogglePhysicalProduct}
              >
                This is a physical product
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
                id='styled-checkbox-6'
                type='checkbox'
                value='value5'
              />
              <label
                htmlFor='styled-checkbox-6'
                onClick={handleTogglePhysicalProduct}
              >
                This is a physical product
              </label>
            </li>
          </ul>
        </CheckboxDiv>
      )}
    </>
  );
};

export default PhysicalProduct;
