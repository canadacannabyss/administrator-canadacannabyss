import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BackgroundDashboard = styled.div`
  background: #f1f1f1;
  width: 100%;
`;

const Background = styled.div`
  background: #f1f1f1;
  width: 100%;
  padding: 20px;
  @media(max-width: 991px) {
    padding: 0;
  }
`;

const BackgroundAdd = styled.div`
  background: #f1f1f1;
  width: 100%;
  padding: 20px;
  @media(max-width: 768px) {
    padding: 20px 0;
  }
`;

const BackgroundLogin = styled.div`
  background: #f1f1f1;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const BackgroundMap = styled.div`
  background: #f1f1f1;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

export {
  PageContainer, Background, BackgroundLogin, BackgroundAdd, BackgroundDashboard, BackgroundMap
};
