import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

const Window = styled.div`
  width: calc(50vmin + 19px);
  height: calc(50vmin + 31px);
  min-width: 279px;
  min-height: 291px;
  box-sizing: border-box;
  position: relative;
  border-color: ${ props => props.theme.background };
  background-color: ${ props => props.theme.background };
  color: ${ props => props.theme.foreground };
  border-style: solid;
  border-width: 8px 2px;
  box-shadow: 16px 16px var(--black);

  ${
  props => props.title && css`
      :before {
        content: '${ props.title }';
        padding: 0 8px;
        position: absolute;
        top: -6px;
        left: 50%;
        width: max-content;
        height: 16px;
        background-color: ${ props => props.theme.background };
        transform: translateX(-50%);
        z-index: 1;
      }
    `
}
`;

export default ({ theme, title, children }) =>
  <ThemeProvider theme={ theme }>
    <Window title={ title }>
        { children }
    </Window>
  </ThemeProvider>;
