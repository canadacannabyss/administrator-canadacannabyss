import styled from 'styled-components';
import { fadeText } from '../../Animations/Animations';

export const Wrapper = styled.div`
  margin: 40px auto;
  width: 80%;
  @media (max-width: 991px) {
    width: 90%;
  }
`;

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 1rem;
  @media (max-width: 520px) {
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

export const ReferralLink = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  @media (max-width: 590px) {
    flex-direction: column;
    align-items: unset;
  }
  p {
    font-size: 14px;
    color: #000;
    font-weight: 900;
    margin-bottom: 0.5rem;
    text-align: left;
    @media (max-width: 520px) {
      text-align: center;
    }
  }
  span {
    color: #18840f;
    font-size: 16px;
    border: 1px solid #bdbdbd;
    background: #f7f7f7;
    border-radius: 4px;
    padding: 2px 4px;
    word-break: break-all;
    cursor: pointer;
    &:active {
      background: #f2f2f2;
    }
    @media (max-width: 590px) {
      margin-left: 0px;
    }
    @media (max-width: 520px) {
      text-align: center;
      display: table;
      margin: 0 auto;
    }
    @media (max-width: 290px) {
      width: 100%;
    }
  }
`;

export const InvitedFriendsTitle = styled.h1`
  font-size: 16px;
  margin-bottom: 0.5rem;
`;

export const Credits = styled.div`
  display: flex;
  flex-direction: row;
  .creditP {
    p {
      font-size: 14px;
      font-weight: 900;
      margin-right: 5px;
    }
  }
  .creditSpan {
    span {
      font-size: 17px;
      color: #18840f;
    }
  }
  @media (max-width: 768px) {
    margin-top: 15px;
  }
  @media (max-width: 520px) {
    flex-direction: column;
    margin: 15px auto 0 auto;
    display: table;
    .creditP {
      p {
        text-align: center;
        margin-right: 0;
      }
    }
    .creditSpan {
      span {
        margin: 0 auto;
        display: table;
      }
    }
  }
`;

export const NoInvitedFriends = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

export const ContainerLoading = styled.div`
  margin-bottom: 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;
  @media (max-width: 1199px) {
    grid-gap: 5px;
  }
  @media (max-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const WrapperLoading = styled.div`
  margin-bottom: 0.5rem;
  padding: 10px 15px 10px 0px;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  animation: ${fadeText} 1s infinite;
  width: 100%;
  height: 63px;
`;

export const Container = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  @media (max-width: 768px) {
    border-radius: 0px;
  }
`;

export const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px 14px;
`;

export const Content = styled.div`
  width: 100%;
  margin-top: 20px;
`;
