import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;

  & > div:nth-child(2) {
    z-index: 1;
  }
`;
