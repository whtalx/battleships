import styled, {css} from 'styled-components';

export default styled.div`
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  border: 3px double ${ props => props.theme.border };

  ${
    props => props.modal
      ? css`
        width: calc(50vmin + 5px);
        height: calc(50vmin - 4px);
        min-width: 265px;
        min-height: 257px;
      `
      : props.select && css`
        width: 265px;
        height: 257px;
      `
  }
`;
