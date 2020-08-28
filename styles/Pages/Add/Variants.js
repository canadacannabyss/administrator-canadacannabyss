import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 40px auto 20px auto;
  width: 80%;
  @media (max-width: 991px) {
    width: 90%;
  }
`;

export const VariantsDiv = styled.div`
  background: #fff;
  width: 100%;
  overflow-x: scroll;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media(max-width: 768px) {
    border-radius: 0px;
    margin-bottom: 20px;
  }
`;

export const ContentContainer = styled.div`
  height: 100%;
  padding: 10px 14px;
`;

export const Content = styled.div`
  width: 100%;
`;

export const InputsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const InputsDivGrid = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 0.2fr 1fr 0.5fr 0.5fr 1fr 1fr 0.3fr;
  margin-bottom: 6px;
  @media (max-width: 768px) {
    padding-right: 20px;
    div {
      .price,
      .compareTo {
        width: 100px;
      }
      .sku,
      .barcode {
        width: 200px;
      }
      .quantity {
        width: 80px;
      }
    }
  }
`;

export const CheckboxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VariantsDivDisplay = styled.div`
  width: 100%;
  min-height: 40px;
  font-size: 16px;
  display: block;
  margin: 5px 0;
  padding: 8px;
  text-align: center;
  box-sizing: border-box;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
  &::placeholder {
    color: 1px solid rgb(184, 196, 194);
  }
`;

export const OptionNameInput = styled.input`
  height: 40px;
  width: 150px;
  font-size: 16px;
  display: block;
  margin: 5px 0;
  padding-left: 12px;
  box-sizing: border-box;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  transition: all 0.2s ease-in-out;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
  &::placeholder {
    color: 1px solid rgb(184, 196, 194);
  }
`;

export const OptionValuesInput = styled.input`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin: 5px 0;
  padding-left: 12px;
  box-sizing: border-box;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  transition: all 0.2s ease-in-out;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
  &::placeholder {
    color: 1px solid rgb(184, 196, 194);
  }
  @media (max-width: 768px) {
    width: 490px;
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70px;
`;

export const AddFieldButton = styled.button`
  background: #18840f33;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background: #18840f40;
  }
  &:active {
    background: #18840f54;
  }
  &:focus {
    outline: none;
  }
  svg {
    color: #18840f;
    font-size: 14px;
  }
`;

export const RemoveFieldButton = styled.button`
  color: #ff0000;
  background: #ff00002b;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background: #ff000040;
  }
  &:active {
    background: #ff000054;
  }
  &:focus {
    outline: none;
  }
  svg {
    color: #ff0000;
    font-size: 14px;
  }
`;

export const VariantsFieldsDiv = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr;
  grid-gap: 8px; */
  width: 100%;
  @media (max-width: 768px) {
    #labelsGrid {
      grid-template-columns: 30px 125px 100px 100px 200px 200px 70px;
    }
  }
`;

export const VariantsH2 = styled.h2`
  font-size: 17px;
  font-weight: 900;
  color: #18840f;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  color: #18840f;
  font-size: 13px;
  font-weight: 900;
`;
