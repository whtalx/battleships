import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  margin: 8px;
  width: calc(50vmin - 20px);
  height: calc(50vmin - 20px);
  min-width: 292px;
  min-height: 292px;
  box-sizing: border-box;
  border: 2px solid ${ props => props.move ? css`var(--yellow)` : css`var(--olive)` };
  background-color: ${ props => props.move ? css`var(--silver)` : css`var(--gray)` };
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-gap: 1px;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
`;

export default ({ move, children }) =>
  <Wrapper move={ move }>
    <Content move={ move } children={ children } />
  </Wrapper>
