import React from 'react';
import {
  CheckboxDiv,
  CheckboxDivChecked,
} from '../../../../styles/Components/UI/Buttons/Checkbox/PhysicalProduct';

const IsCanadaCannabyss = (props) => {
  const { handleCheckCanadaCannabyssTeam, isCanadaCannabyssTeam } = props;

  const handleToggleCanadaCannabyssTeam = () => {
    const toggle = handleCheckCanadaCannabyssTeam;
    toggle();
  };

  return (
    <>
      {isCanadaCannabyssTeam ? (
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
                onClick={handleToggleCanadaCannabyssTeam}
              >
                Canada Cannabyss Team
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
                onClick={handleToggleCanadaCannabyssTeam}
              >
                Canada Cannabyss Team
              </label>
            </li>
          </ul>
        </CheckboxDiv>
      )}
    </>
  );
};

export default IsCanadaCannabyss;
