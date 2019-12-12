import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  position: relative;
  background-color: var(--gray);
  background-clip: content-box;
  border: 3px double ${ props => props.theme.border };
`;