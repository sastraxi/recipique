import React from 'react';
import styled, { keyframes } from 'styled-components';

import logo from './logo.svg';

function wiggleRotation(degree) {
  const rotation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-${degree}deg);
    }
    50% {
      transform: rotate(0deg);
      opacity: .9
    }
    75% {
      transform: rotate(${degree}deg);
    }
  `;
  return rotation;
}

const LoadingIndicator = styled.img`
  animation: ${wiggleRotation(10)} 0.4s ease-in-out infinite;
  width: 6em;
  height: 6em;
  margin: 0 auto;
  display: block;
`;

export default () =>
  <LoadingIndicator src={logo} title="Loading" />;
