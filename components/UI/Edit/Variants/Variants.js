import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {
  AddFieldButton,
  ButtonsDiv,
  InputsDiv,
  OptionNameInput,
  OptionValuesInput,
  RemoveFieldButton,
  VariantsDiv,
  VariantsFieldsDiv,
  VariantsDivDisplay,
  InputsDivGrid,
  CheckboxDiv,
  Content,
  ContentContainer,
  VariantsH2,
  Label,
} from '../../../../styles/Pages/Add/Variants';

const Variants = (props) => {
  const { handleGetVariants, handleGetVariantsOptionNames } = props;

  const [optionFields, setOptionFields] = useState([
    { optionName: '', optionValues: '' },
  ]);
  const [optionValuesArray, setOptionValuesArray] = useState([[]]);
  const [combinedValues, setCombinedValues] = useState([]);
  const [modifiableOptionValues, setModifiableValues] = useState([]);

  useEffect(() => {
    handleGetVariants(modifiableOptionValues);
  }, [modifiableOptionValues]);

  useEffect(() => {
    const values = [];

    optionFields.map((value) => {
      values.push(value.optionName);
    });
    handleGetVariantsOptionNames(values);
  }, [optionFields]);

  const AddModifiableOptionValues = () => {
    const values = [...modifiableOptionValues];
    values.push({
      active: true,
      variantValues: [],
      prices: {
        price: 0,
        compareTo: 0,
      },
      inventory: {
        sku: '',
        barcode: '',
        quantity: 0,
      },
    });
    setModifiableValues(values);
  };

  useEffect(() => {
    const values = [];
    for (let i = 0; i < combinedValues.length; i += 1) {
      values.push({
        active: true,
        variantValues: [],
        prices: {
          price: 0,
          compareTo: 0,
        },
        inventory: {
          sku: '',
          barcode: '',
          quantity: 0,
        },
      });
    }

    combinedValues.map((value, index) => {
      values[index].variantValues = value;
    });

    setModifiableValues(values);
  }, [combinedValues]);

  const permute = (input) => {
    const out = [];

    (function permuteR(input, current) {
      if (input.length === 0) {
        out.push(current);
        return;
      }

      const next = input.slice(1);

      for (let i = 0, n = input[0].length; i != n; ++i) {
        permuteR(next, current.concat([input[0][i]]));
      }
    }(input, []));

    return out;
  };

  useEffect(() => {
    const combinatedValuesResult = permute(optionValuesArray);

    setCombinedValues(combinatedValuesResult);
    // console.log('combinatedValuesResult:', combinatedValuesResult);
  }, [optionValuesArray]);

  const handleAddFields = () => {
    const values = [...optionFields];
    const valuesArray = [...optionValuesArray];
    values.push({ optionName: '', optionValues: '' });
    valuesArray.push([]);
    setOptionFields(values);
    setOptionValuesArray(valuesArray);
  };

  const handleRemoveFields = (index) => {
    const values = [...optionFields];
    const valuesArray = [...optionValuesArray];
    values.splice(index, 1);
    valuesArray.splice(index, 1);
    setOptionFields(values);
    setOptionValuesArray(valuesArray);
  };

  const handleInputChange = (index, e) => {
    const values = [...optionFields];
    if (e.target.name === 'optionName') {
      values[index].optionName = e.target.value;
    } else {
      values[index].optionValues = e.target.value;
    }
    setOptionFields(values);
  };

  const variantValuesToArray = (index) => {
    const valuesArray = [...optionValuesArray];
    const tempValues = optionFields[index].optionValues.split(',');
    tempValues.map((tag, i) => {
      tempValues[i] = tempValues[i].trim();
    });
    valuesArray[index] = tempValues;
    setOptionValuesArray(valuesArray);
  };

  const handleCombinedInputChange = (index, e) => {
    const values = [...modifiableOptionValues];
    if (e.target.name === 'active') {
      if (e.target.value === 'true') {
        values[index].active = true;
      }
      if (e.target.value === 'false') {
        values[index].active = false;
      }
    }
    if (e.target.name === 'variantValues') {
      values[index].variantValues = e.target.value;
    }
    if (e.target.name === 'price') {
      values[index].prices.price = Math.round((parseFloat(e.target.value) + Number.EPSILON) * 100) / 100;
    }
    if (e.target.name === 'compareTo') {
      values[index].prices.compareTo = Math.round((parseFloat(e.target.value) + Number.EPSILON) * 100) / 100;
    }
    if (e.target.name === 'sku') {
      values[index].inventory.sku = e.target.value;
    }
    if (e.target.name === 'barcode') {
      values[index].inventory.barcode = e.target.value;
    }
    if (e.target.name === 'quantity') {
      values[index].inventory.quantity = Math.round((parseFloat(e.target.value) + Number.EPSILON) * 100) / 100;
    }
    setModifiableValues(values);
  };

  const convertVariantArrayToString = (index) => {
    if (modifiableOptionValues[index] !== undefined) {
      let variantString = '';
      modifiableOptionValues[index].variantValues.map((variant, key) => {
        if (key === modifiableOptionValues[index].variantValues.length - 1) {
          variantString += `${variant}`;
        } else {
          variantString += `${variant} `;
        }
      });
      return variantString;
    }
  };

  const getActiveVariantValue = (index) => {
    if (modifiableOptionValues[index] !== undefined) {
      const values = [...modifiableOptionValues];
      values[index].active = !values[index].active;
      setModifiableValues(values);
    }
  };

  return (
    <>
      <VariantsDiv>
        <ContentContainer>
          <Content>
            <VariantsH2>Variants</VariantsH2>
            <VariantsFieldsDiv>
              {optionFields.length > 0 && (
              <>
                {optionFields.map((inputField, index) => (
                  <InputsDiv key={index}>
                    <OptionNameInput
                      onChange={(e) => {
                        handleInputChange(index, e);
                      }}
                      value={inputField.title}
                      placeholder='Option name'
                      name='optionName'
                    />
                    <OptionValuesInput
                      onChange={(e) => {
                        handleInputChange(index, e);
                        variantValuesToArray(index);
                      }}
                      value={inputField.title}
                      placeholder='Option values'
                      name='optionValues'
                      style={{
                        marginLeft: '5px',
                      }}
                    />
                    <ButtonsDiv>
                      <AddFieldButton
                        onClick={() => {
                          handleAddFields();
                          AddModifiableOptionValues();
                        }}
                      >
                        <FaPlus />
                      </AddFieldButton>
                      {optionFields.length > 1 && (
                      <RemoveFieldButton onClick={() => handleRemoveFields()}>
                        <FaMinus />
                      </RemoveFieldButton>
                      )}
                    </ButtonsDiv>
                  </InputsDiv>
                ))}
              </>
              )}
            </VariantsFieldsDiv>
          </Content>
        </ContentContainer>
      </VariantsDiv>

      {combinedValues.length > 0 && (
        <VariantsDiv>
          <ContentContainer>
            <Content>
              <VariantsFieldsDiv>
                <InputsDivGrid id='labelsGrid'>
                  <div />
                  <div>
                    <Label>Variant</Label>
                  </div>
                  <div>
                    <Label className='price'>Price</Label>
                  </div>
                  <div>
                    <Label className='compareTo'>Compare To</Label>
                  </div>
                  <div>
                    <Label>SKU</Label>
                  </div>
                  <div>
                    <Label>Barcode</Label>
                  </div>
                  <div>
                    <Label>Quantity</Label>
                  </div>
                </InputsDivGrid>
                {combinedValues.map((value, index) => (
                  <InputsDivGrid>
                    <CheckboxDiv>
                      {modifiableOptionValues[index] !== undefined && (
                      <>
                        {modifiableOptionValues[index].active ? (
                          <input
                            type='checkbox'
                            name='active'
                            autoComplete='off'
                            onChange={(e) => {
                              handleCombinedInputChange(index, e);
                              getActiveVariantValue(index, e);
                            }}
                            checked
                          />
                        ) : (
                          <input
                            type='checkbox'
                            name='active'
                            autoComplete='off'
                            onChange={(e) => {
                              handleCombinedInputChange(index, e);
                              getActiveVariantValue(index, e);
                            }}
                          />
                        )}
                      </>
                      )}
                    </CheckboxDiv>
                    <div>
                      <VariantsDivDisplay type='text' name='variantValues' disabled>
                        {convertVariantArrayToString(index)}
                      </VariantsDivDisplay>
                    </div>
                    <div>
                      <OptionValuesInput
                        className='price'
                        name='price'
                        type='number'
                        step='0.1'
                        min='0'
                        autoComplete='off'
                        onChange={(e) => {
                          handleCombinedInputChange(index, e);
                        }}
                        required
                      />
                    </div>
                    <div>
                      <OptionValuesInput
                        className='compareTo'
                        name='compareTo'
                        type='number'
                        step='0.1'
                        min='0'
                        autoComplete='off'
                        onChange={(e) => {
                          handleCombinedInputChange(index, e);
                        }}
                      />
                    </div>
                    <div>
                      <OptionValuesInput
                        className='sku'
                        name='sku'
                        autoComplete='off'
                        onChange={(e) => {
                          handleCombinedInputChange(index, e);
                        }}
                        required
                      />
                    </div>
                    <div>
                      <OptionValuesInput
                        className='barcode'
                        name='barcode'
                        autoComplete='off'
                        onChange={(e) => {
                          handleCombinedInputChange(index, e);
                        }}
                        required
                      />
                    </div>
                    <div>
                      <OptionValuesInput
                        className='quantity'
                        name='quantity'
                        type='number'
                        step='1'
                        min='0'
                        autoComplete='off'
                        onChange={(e) => {
                          handleCombinedInputChange(index, e);
                        }}
                        required
                      />
                    </div>
                  </InputsDivGrid>
                ))}
              </VariantsFieldsDiv>
            </Content>
          </ContentContainer>
        </VariantsDiv>
      )}
    </>
  );
};

Variants.propTypes = {
  handleGetVariants: PropTypes.func.isRequired,
  handleGetVariantsOptionNames: PropTypes.func.isRequired,
};

export default Variants;
