import React from 'react';
import styled, { css } from 'styled-components';

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: var(--navy);
  color: ${
    props => props.last
      ? css`var(--aqua)`
      : (props.miss || props.sank || props.hit)
        ? css`var(--gray)`
        : css`var(--white)`
  };
`;

export default (props) =>
  <Cell {...props}>
    { props.miss ? `*` : props.ship && `▐█▌` }
  </Cell>
