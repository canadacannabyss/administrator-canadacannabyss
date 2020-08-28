import styled from 'styled-components';
import { spin } from '../../Animations/Animations';

export const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  @media (max-width: 991px) {
    width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 0.5rem;
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
