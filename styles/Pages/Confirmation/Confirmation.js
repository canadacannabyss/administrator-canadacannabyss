import styled from 'styled-components';
import { spin } from '../../Animations/Animations';

const Wrapper = styled.div`
  margin: 40px auto;
  width: 80%;
  @media (max-width: 991px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: #777;
  font-size: 16px;
`;

const ConfirmationMessage = styled.div`
  width: 350px;
  display: table;
  padding: 7px 13px;
  text-align: center;
  margin: 10px auto;
  border: 1px solid #18840f66;
  border-image: initial;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  background: #18840f33;
  color: #18840f;
  p {
    text-align: center;
    span {
      font-weight: 900;
    }
  }
`;

const ConfirmationMessageError = styled.p`  
  color: #840f0f;
  text-align: center;
  span {
    font-weight: 900;
  }
`;

const Loading = styled.div`
  display: table;
  margin: 15px auto;
  animation-name: ${spin};
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  svg {
    font-size: 20px;
    color: #777;
  }
`;

const LoadingSpinner = styled.div`
  display: table;
  margin: 15px auto;
  animation-name: ${spin};
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  svg {
    font-size: 20px;
    color: #777;
  }
`;

const Container = styled.div`
  width: 260px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%); 
  border-radius: 4px;
  background: #fff;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 4px, rgba(0,0,0,0.15) 0px 0px 2px;
  padding: 20px 20px;
  @media (max-width: 320px) {
    width: 80%;
  }
  p {
    text-align: center;
    span {
      color: #18840f;
      font-weight: 900;
    }
  }
`;

const BlurredBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  div {
    background-image: ${(props) => `url('${props.bgImg}')`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(4px);
    height: 100%;
    width: 100%;
    transform: scale(1.2);
  }
`;

const BrandDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0rem 0.5rem 0.5rem 0.5rem;;
  img {
    height: 40px;
    width: 40px;
  }
  p {
    color: #18840f;
    font-size: 15px;
    line-height: 15px;
    span {
      font-weight: 900;
      font-size: 16px;
      color: #b01129;
    }
  }
  .sep {
    content: '';
    width: 2px;
    height: 20px;
    background: #b01129;
    position: relative;
    display: block;
    margin: 0 10px;
  }
  h1 {
    color: #b01129;
    font-size: 17px;
    font-weight: 900;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Label = styled.label`
  color: #18840f;
  font-size: 13px;
  font-weight: 900;
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

const Submit = styled.button`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-top: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  letter-spacing: 0.04em;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 4px, rgba(0,0,0,0.15) 0px 0px 2px;
  color: rgb(24, 132, 15);
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(24, 132, 15, 0.4);
  border-image: initial;
  border-radius: 4px;
  background: rgba(24, 132, 15, 0.2);
  transition: all 0.15s ease-in-out 0s;
  &:focus {
    outline: none;
  }
`;

export {
  BlurredBackground,
  BrandDiv,
  ConfirmationMessage,
  ConfirmationMessageError,
  Container,
  Form,
  Input,
  Label,
  Loading,
  LoadingSpinner,
  Submit,
  Title,
  Wrapper
};
