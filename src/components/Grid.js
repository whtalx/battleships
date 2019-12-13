import styled from 'styled-components';

export default styled.div`
  margin: 2px;
  display: grid;
  grid-gap: 1px;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  background-color: var(--gray);
  border: 2px solid ${ props => props.move ? `var(--yellow)` : `var(--gray)` };
`;