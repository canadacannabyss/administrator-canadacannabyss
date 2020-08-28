import styled from 'styled-components';

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-areas: 'a a a b';
  grid-gap: 20px;
  .main {
    grid-area: a;
  }
  .side {
    grid-area: b;
  }
  @media (max-width: 1460px) {
    width: 100%;
  }
  @media (max-width: 991px) {
    display: block;
    .main {
      margin-bottom: 20px;
    }
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  @media (max-width: 768px) {
    display: block;
  }
`;

const HalfGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Container = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  @media (max-width: 768px) {
    border-radius: 0px;
    margin-bottom: 20px;
  }
`;

const SideContainer = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  @media (max-width: 340px) {
    border-radius: 0px;
  }
`;

const StickyDiv = styled.div`
  position: sticky;
  top: 20px;
  width: 100%;
  height: fit-content;
`;

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px 14px;
`;

const Content = styled.div`
  width: 100%;
`;

const TitleSearchBarAddButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const PlusIconSign = styled.div`
  .mainIcon {
    margin-right: 10px;
    font-size: 22px;
    color: #18840f;
  }
  .plus {
    font-size: 12px;
    color: #18840f;
    transform: translate(-5px, -14px);
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42px;
  h1 {
    font-size: 20px;
    color: #18840f;
  }
  h2 {
    font-size: 18px;
    color: #18840f;
  }
`;

const SearchBarAddButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.div`
  border-radius: 4px;
  border: 1px solid #18440f66;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: end;
  justify-content: end;
  input {
    background: #fff;
    padding: 11px 4px 11px 16px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  button {
    border: none;
    background: #fff;
    padding: 4px 15px;
    color: #18840f;
    height: 100%;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:active {
      svg {
        transform: scale(0.9);
      }
    }
    svg {
      transition: all 0.1s ease-in-out;
    }
  }
`;

const AddProductLink = styled.a`
  background: #18840f;
  color: #fff;
  padding: 10px 10px 8px 10px;
  font-size: 16px;
  margin-left: 10px;
  align-self: center;
  border-radius: 4px;
  cursor: pointer;
  @media (max-width: 450px) {
    font-size: 15px;
  }
`;

const SpansDiv = styled.div`
  border-radius: 4px;
  padding: 7px 10px;
  height: 35px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #18840f;
    font-size: 14px;
    font-weight: 900;
  }
  .productNameSpan {
    width: 400px;
    @media (max-width: 1190px) {
      width: 300px;
    }
    @media (max-width: 991px) {
      width: 400px;
    }
  }
  .featuredSpan {
    display: flex;
    flex-direction: row;
    justify-self: center;
  }
  .buttonsSpan {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70px;
  }
  @media (max-width: 1199px) {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(7, 1fr);
  }
  @media (max-width: 1199px) {
    width: 100%;
    display: grid;
    grid-gap: 5px;
    border-radius: 4px;
    overflow-x: scroll;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Label = styled.label`
  color: #18840f;
  font-size: 13px;
  font-weight: 900;
`;

const InputGroupTitle = styled.h3`
  font-size: 17px;
  color: #18840f;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: #fff;
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
`;

const Select = styled.select`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: #fff;
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  height: 200px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: #fff;
  resize: none;
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #18840f;
    border: 1px solid #18840f;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #18840f;
  }
`;

const OrganizationTextArea = styled.textarea`
  height: 100px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: #fff;
  resize: none;
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #18840f;
    border: 1px solid #18840f;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #18840f;
  }
`;

const WeightLabel = styled.label`
  font-size: 14px;
  font-weight: 900;
  color: #18840f;
`;

const WeightDescription = styled.p`
  font-size: 15px;
  color: #777777;
  margin-bottom: 0.5rem;
`;

const WeightInput = styled.input`
  height: 40px;
  width: 100px;
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
`;

const WeightUnitSelect = styled.select`
  height: 40px;
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  transition: all 0.2s ease-in-out 0s;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  font-size: 16px;
  display: block;
  margin: 15px auto 0px auto;
  padding: 10px 15px;
  box-sizing: border-box;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  color: rgb(24, 132, 15);
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(24, 132, 15, 0.4);
  border-image: initial;
  border-radius: 4px;
  background: rgba(24, 132, 15, 0.2);
  -webkit-transition: all 0.15s ease-in-out 0s;
  transition: all 0.15s ease-in-out 0s;
  &:focus {
    outline: none;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  display: block;
  position: fixed;
  top: 0;
  z-index: 99999999999;
`;

const LoadingSpinner = styled.div`
  display: table;
  margin: 15px auto;
  /* animation-name: ${spin}; */
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  svg {
    font-size: 20px;
    color: #18840f;
  }
`;

const Warning = styled.div`
  border: 1px solid #d42626;
  border-radius: 3px;
  padding: 5px 10px;
  color: #d42626;
  font-size: 12px;
  margin: 7px auto;
  display: table;
  cursor: default;
  background: #d426260f;
  text-transform: uppercase;
`;

export {
  Wrapper,
  StickyDiv,
  MainGrid,
  HalfGrid,
  Container,
  SideContainer,
  PlusIconSign,
  SearchBarAddButtonDiv,
  TitleSearchBarAddButtonDiv,
  SearchBar,
  AddProductLink,
  TitleDiv,
  ContentContainer,
  Content,
  SpansDiv,
  Label,
  InputGroupTitle,
  Input,
  Select,
  TextArea,
  OrganizationTextArea,
  WeightLabel,
  WeightInput,
  WeightUnitSelect,
  WeightDescription,
  SubmitButton,
  Loading,
  LoadingSpinner,
  Warning
};
