import React from 'react';
import styled, { css } from 'styled-components';

export default styled.div`
  width: calc(5vmin);
  height: calc(5vmin);
  min-width: 26px;
  min-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: var(--navy);

  ${
    props => props.ship && css`
      :after {
        content: '';
        width: 60%;
        height: 50%;
        background-color: ${
          props.last
            ? css`var(--aqua)`
            : props.sank
                ? css`var(--gray)`
                : !props.isCompleted || props.hit
                  ? css`var(--silver)`
                  : css`var(--white)`
        };
      }
    `
  }

  ${
    props => props.miss && css`
      :after {
        content: '';
        width: 10%;
        height: 10%;
        border-radius: 50%;
        background-color: ${
          props.last
            ? css`var(--aqua)`
            : css`var(--gray)`
        };
      }
    `
  }
`;
