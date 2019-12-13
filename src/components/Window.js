import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

const Window = styled.div`
  margin: 2px;
  box-sizing: border-box;
  position: relative;
  border-color: ${ props => props.theme.background };
  background-color: ${ props => props.theme.background };
  color: ${ props => props.theme.foreground };
  border-style: solid;
  border-width: 8px 4px;
  box-shadow: ${ props => props.modal ? `none` : `16px 16px var(--black)` };

  ${
    props => props.title_ && css`
      :before {
        content: '${ props.title_ }';
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

export default ({ theme, title, modal, children }) =>
  <ThemeProvider theme={ theme }>
    <Window title_={ title } modal={ modal }>
        { children }
    </Window>
  </ThemeProvider>;
