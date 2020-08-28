import React from 'react';
import { CheckboxDiv } from '../../../../styles/Components/UI/Buttons/Checkbox/AddProductCheckbox';

const AddProductCheckbox = (props) => {
  const { handleCheckColor, handleCheckFlavour, handleCheckSize } = props;

  const handleToggleColor = () => {
    const toggle = handleCheckColor;
    toggle();
  };

  const handleToggleFlavour = () => {
    const toggle = handleCheckFlavour;
    toggle();
  };

  const handleToggleSize = () => {
    const toggle = handleCheckSize;
    toggle();
  };

  return (
    <CheckboxDiv>
      <ul className='unstyled centered'>
        <li>
          <input
            tabIndex='-1'
            className='styled-checkbox'
            id='styled-checkbox-2'
            type='checkbox'
            value='value2'
          />
          <label htmlFor='styled-checkbox-2' onClick={handleToggleColor}>
            Color
          </label>
        </li>
        <li>
          <input
            tabIndex='-1'
            className='styled-checkbox'
            id='styled-checkbox-3'
            type='checkbox'
            value='value2'
          />
          <label htmlFor='styled-checkbox-3' onClick={handleToggleFlavour}>
            Flavour
          </label>
        </li>
        <li>
          <input
            className='styled-checkbox'
            id='styled-checkbox-4'
            type='checkbox'
            value='value3'
          />
          <label htmlFor='styled-checkbox-4' onClick={handleToggleSize}>
            Size
          </label>
        </li>
      </ul>
    </CheckboxDiv>
  );
};

export default AddProductCheckbox;
