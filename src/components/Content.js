import styled from 'styled-components';

export default styled.div`
  padding: 8px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  border: 3px double ${ props => props.theme.border };
`;
