import styled from 'styled-components';

const VerificationMsg = styled.div`
  padding: 6px 10px;
  margin: 0 auto;
  background: #f1f1f1;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  p {
    text-align: center;
    width: 100%;
    color: #5a5a5a;
    font-size: 16px;
    span {
      font-weight: 900;
    }
  }
`;

const Container = styled.div`
  width: 300px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%); 
  border-radius: 4px;
  background: #fff;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 4px, rgba(0,0,0,0.15) 0px 0px 2px;
  padding: 15px 20px 20px 20px;
  @media (max-width: 370px) {
    width: 80%;
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
  .disabled {
    background: #f1f1f1;
    color: #5a5a5a;
    border: 1px solid #e0e0e0;
  }
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

const HalfGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  @media (max-width: 370px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0px;
  }
`;

const Warning = styled.div`
  border: 1px solid #d426269e;
  background-color: #d426260f;
  display: table;
  margin: 5px auto;
  border-radius: 5px;
  padding: 5px 8px;
  color: #d42626;
  font-size: 13px;
  letter-spacing: 1px;
  text-align: center;
`;

const ErrorMsg = styled.p`
  color: #b01129;
  text-align: center;
`;

export {
  Container,
  BrandDiv,
  Form,
  Label,
  Input,
  Submit,
  BlurredBackground,
  HalfGrid,
  VerificationMsg,
  Warning,
  ErrorMsg
};
