import React from 'react';
import {
  CheckboxDiv,
  CheckboxDivChecked
} from '../../../../styles/Components/UI/Buttons/Checkbox/AllowCustomersPurchaseOutOfStockCheckbox';

const FeaturedCheckbox = (props) => {
  const { handleCheckFeatured, featured } = props;
  console.log('featured:', featured);

  const handleToggleFeatured = () => {
    const toggle = handleCheckFeatured;
    toggle();
  };

  return (
    <>
      {featured ? (
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
              <label htmlFor='styled-checkbox-5' onClick={handleToggleFeatured}>
                Featured
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
              <label htmlFor='styled-checkbox-5' onClick={handleToggleFeatured}>
                Featured
              </label>
            </li>
          </ul>
        </CheckboxDiv>
      )}
    </>
  );
};

export default FeaturedCheckbox;
