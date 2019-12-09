import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 196px;
  position: relative;
`;

const Input = styled.input.attrs({
  type: `text`,
})`
  width: ${ props => props.size * 9 }px;
  height: 14px;
  min-width: 0;
  z-index: 1;
`;

const Placeholder = styled.span`
  position: absolute;
  top: 0;
  left: 8px;
  background-color: var(--black);
  color: var(--white);
  font-size: inherit;
  line-height: 1;
`;

export default ({ onChange, onSelect, value = `` }) =>
  <Wrapper>
    [
      <Placeholder>{ `.`.repeat(20) }</Placeholder>
      <Input onSelect={ onSelect } onChange={ onChange } value={ value } size={ value.length } />
    ]
  </Wrapper>