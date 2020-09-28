import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  @media (max-width: 1460px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  background: #fff;
  width: 100%;
  /* height: 100vh; */
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  @media (max-width: 991px) {
    margin: 20px 0;
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
`;

export const Viewer = styled.div`
  div {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ViewerDiv = styled.div`
  max-height: 500px;
  width: 100%;
  overflow-y: scroll;
  img {
    width: 100%;
  }
`;
