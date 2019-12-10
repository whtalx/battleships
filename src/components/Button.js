import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 0 16px;
  height: 16px;
  min-width: 60px;
  background-color: var(--white);
  box-shadow: 8px 8px 0 var(--black);
  color: var(--gray);

  & + & {
    margin-left: 24px;
  }

  :focus {
    background-color: var(--yellow);
    color: var(--maroon);
  }

  span {
    color: var(--black);
  }
`;

export default ({ autoFocus, className, onClick, text = ``, index }) =>
  <Button
    autoFocus={ autoFocus }
    className={ className }
    onClick={ typeof onClick === `function` ? onClick : undefined }
  >
    {
      index === undefined
        ? text
        : [
          text.substring(0, index),
          <span key={ text }>{ text[index] }</span>,
          text.substring(index + 1)
        ]
    }
  </Button>
