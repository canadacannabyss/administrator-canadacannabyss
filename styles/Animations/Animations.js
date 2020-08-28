import { keyframes } from 'styled-components';

const SidebarBackgroundFadeIn = keyframes`
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const SidebarBackgroundFadeOut = keyframes`
  0% {
    background: rgba(0, 0, 0, 0.2);
  }
  100% {
    background: rgba(0, 0, 0, 0);
  }
`;

const spin = keyframes`
  from {
      transform:rotate(0deg);
  }
  to {
      transform:rotate(360deg);
  }
`;

const fadeText = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export {
  SidebarBackgroundFadeIn,
  SidebarBackgroundFadeOut,
  spin,
  fadeText
};
