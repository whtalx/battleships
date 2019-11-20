import styled from 'styled-components';

export default styled.div`
  margin: 10px;
  padding: 0 1px 1px 0;
  min-width: 300px;
  min-height: 300px;
  width: calc(50vmin - 26px);
  height: calc(50vmin - 26px);
  position: relative;
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  border: 3px double ${ props => props.border ? props.move ? `#555` : `#aaa` : `#000` };
  // TODO: fix padding-bottom in ios
`;
