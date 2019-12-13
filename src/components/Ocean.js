import React from 'react';
import styled from 'styled-components';
import Window from './Window';
import navy from '../themes/navy';

const Content =  styled.div`
  padding: 8px 2px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  border: 3px double ${ props => props.theme.border };

  & > div:nth-child(2) {
    margin-left: 8px;
  }

  @media screen and (max-aspect-ratio: 11/10) {
    flex-flow: column;

    & > div:nth-child(2) {
      margin: 8px 2px 2px;
    }
  }
`;

export default ({ children }) =>
  <Window title={ `battleships` } theme={ navy }>
    <Content>
      { children }
    </Content>
  </Window>