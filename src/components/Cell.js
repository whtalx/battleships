import React from 'react';
import styled, { css } from 'styled-components';

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #00a;
  color: ${ props => props.last ? css`#0ff` : (props.miss || props.sank || props.hit) ? css`#aaa` : css`#fff` };
`;

export default (props) =>
  <Cell {...props}>
    { props.miss ? `*` : props.ship && `▐█▌` }
  </Cell>
