import React from 'react';
import styled, { css } from 'styled-components';

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: var(--blue);
  color: ${ props => props.last ? css`var(--aqua)` : css`var(--gray)` };

  ${
    props => props.ship && css`
      :after {
        content: '';
        width: 60%;
        height: 50%;
        background-color: ${
          props.last
            ? css`var(--aqua)`
            : !props.isCompleted || props.hit
              ? css`var(--silver)`
              : props.sank
                ? css`var(--gray)`
                : css`var(--white)`
        };
      }
    `
  }
`;

export default (props) =>
  <Cell {...props}>{ props.miss && `*` }</Cell>
