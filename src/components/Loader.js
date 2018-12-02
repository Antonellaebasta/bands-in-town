import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  margin-top: 50px;
  border: 2px solid ${COLORS.GREY};
  border-top: 2px solid ${COLORS.YELLOW}
  border-radius: 50%;
  animation: spin 1s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const Loader = () => <Spinner />;

export default Loader;