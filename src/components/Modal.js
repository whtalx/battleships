import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import Window from './Window';
import Content from './Content';
import ShipsLeft from './ShipsLeft';
import gray from '../themes/gray';
import teal from '../themes/teal';
import Buttons from './Buttons';
import Text from './Text';

const Modal = (props) => {
  const title = {
    victory: `you win!`,
    defeat: `you loose!`,
    wait: `please wait`,
    place: `place your ships`,
    confirm: `place your ships`,
  };

  switch (props.game.status) {
    case `defeat`:
    case `victory`:
      return props.game.isAllyWantRepeat
        ? (
          <Window theme={ gray } title={ title[props.game.status] }>
            <Content>
              <p>please wait for your<br />opponent to answer</p>
            </Content>
          </Window>
        )
        : (
          <Window theme={ gray } title={ title[props.game.status] }>
            <Content>
              <Text>play another round?</Text>
              <Text>{ props.game.type === `pvp` && props.game.isEnemyWantRepeat && `your opponent insist` }</Text>
              <Buttons>
                <Button text={ `yes` } index={ 0 } onClick={ props.repeat } autoFocus />
                <Button text={ `no` } index={ 0 } onClick={ props.reset } />
              </Buttons>
            </Content>
          </Window>
        );

    case `wait`:
      return (
        <Window theme={ gray } title={ title[props.game.status] }>
          <Content>
            <p>your opponent<br />placing their ships</p>
          </Content>
        </Window>
      );

    case `place`:
    case `confirm`:
      return (
        <Window theme={ teal } title={ title[props.game.status] }>
          <Content>
            <Text>click on field to place<br />or delete ship deck</Text>
            <Text>ships left:</Text>
            <ShipsLeft />
            <Buttons>
              <Button text={ `random` } index={ 0 } onClick={ props.random } autoFocus />
              <Button text={ `confirm` } index={ 0 } onClick={ props.game.status === `confirm` && props.ready } />
            </Buttons>
          </Content>
        </Window>
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
  random: () => dispatch({ type: `RANDOM` }),
  reset: () => dispatch({ type: `RESET` }),
  ready: () => dispatch({ type: `READY` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
