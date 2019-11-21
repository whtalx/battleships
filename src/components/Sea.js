import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px;
  width: calc(50vmin - 26px);
  height: calc(50vmin - 26px);
  min-width: 300px;
  min-height: 300px;
  box-sizing: border-box;
  border: 3px double ${ props => props.border ? props.move ? `#555` : `#aaa` : `#000` };
  overflow: hidden;
  user-select: none;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-gap: 1px;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
`;

export default (props) =>
  <Wrapper { ...props }>
    <Content grid={ props.grid }>
      { props.children }
    </Content>
  </Wrapper>
