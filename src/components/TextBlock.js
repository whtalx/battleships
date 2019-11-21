import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Sea from './Sea';
import Label from './Label';
import TextButton from './TextButton';

const Wait = styled(Label)`
  grid-row: 4 / span 4;
  grid-column: 1 / span 10;
  align-items: center;
  font-size: 25px;
`;

const Result = styled(Wait)`
  grid-row: 3 / span 3;
  align-items: flex-start;
`;

const Repeat = styled(Wait)`
  grid-row: 6;
  justify-content: space-around;
`;

const Ready = styled(Wait)`
  grid-row: 8;
`;

const resultText = {
  victory: `you win!`,
  defeat: `you loose!`,
};

const TextBlock = (props) => {
  switch (props.game.status) {
    case `defeat`:
    case `victory`:
      return (
        <Sea>
          <Result>
            { resultText[props.game.status] }
            <br/>
            { !props.game.isAllyWantRepeat && `play another round?` }
          </Result>
          <Repeat>
            {
              props.game.isAllyWantRepeat
                ? `waiting for yor opponent answer`
                : [
                  <TextButton key="yes" onClick={ props.repeat }>yes</TextButton>,
                  <TextButton key="no" onClick={ props.reset }>no</TextButton>
                ]
            }
          </Repeat>
          { props.game.isEnemyWantRepeat && <Ready>your opponent said «yes»</Ready> }
        </Sea>
      );

    case `wait`:
      return (
        <Sea>
          <Wait>wait until opponent<br/>place their ships</Wait>
        </Sea>
      );

    default:
      return null;
  }
};

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  repeat: () => dispatch({ type: `REPEAT` }),
  reset: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextBlock);
