import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1 }
  50% { opacity: 1 }
  51% { opacity: 0 }
  to { opacity: 0 }
`;

const Input = styled.input.attrs({
  type: `text`,
  size: 17,
  maxLength: 16,
})`
  margin: 0;
  padding: 0 0 0 4px;
  height: 16px;
  min-width: 0;
  position: relative;
  z-index: 1;
  background: none;
  caret-color: transparent;
`;

const Caret = styled.div`
  position: absolute;
  top: 0;
  right: ${ props => 147 - props.caret * 9 }px;
  animation: ${ blink } 1s linear infinite;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  right: 3px;
  z-index: 1;
`;

const Background = styled.div`
  position: relative;
  background-color: var(--black);
  color: var(--white);
  overflow: hidden;

  ${ Input }:not(:focus) + ${ Caret } {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export default ({ onInput, readonly = false, submit, symbols, value = `` }) => {
  const input = useRef(null);
  const [caret, setCaret] = useState(symbols);
  const moveCaret = (event) => {
    if (event.type === `keydown` && event.key === `Enter`) {
      submit();
    } else {
      setCaret(event.target.selectionEnd);
    }
  };

  !readonly && useEffect(
    () => {
      input.current.focus();
    },// eslint-disable-next-line
    []
  );

  const inputProps = readonly
    ? {
      onChange: (event) => event.preventDefault(),
      value,
    }
    : {
      onClick: moveCaret,
      onKeyUp: moveCaret,
      onPaste: moveCaret,
      onChange: moveCaret,
      onKeyDown: moveCaret,
      onInput,
    };

  return (
    <Wrapper>
      [
      <Background>
        <Placeholder>{ `·`.repeat(17 - symbols) }</Placeholder>
        <Input ref={ input } { ...inputProps } />
        { !readonly && <Caret caret={ caret }>_</Caret> }
      </Background>
      ]
    </Wrapper>
  );
}
