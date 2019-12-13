import React from 'react';
import { connect } from 'react-redux';
import Text from './Text';
import Button from './Button';
import Window from './Window';
import Buttons from './Buttons';
import Content from './Content';
import ShipsLeft from './ShipsLeft';
import gray from '../themes/gray';
import teal from '../themes/teal';

const Modal = ({
  game,
  repeat,
  random,
  reset,
  ready,
}) => {
  const titles = {
    wait: `please wait`,
    victory: `you win!`,
    defeat: `you loose!`,
    place: `place your ships`,
    confirm: `place your ships`,
  };

  switch (game.status) {
    case `defeat`:
    case `victory`:
      return(
        <Window theme={ gray } title={ titles[game.status] } modal>
          {
            game.isAllyWantRepeat
              ? <Content modal><p>please wait for your<br />opponent to answer</p></Content>
              : <Content modal>
                <Text>play another round?</Text>
                <Text>{ game.type === `pvp` && game.isEnemyWantRepeat && `your opponent insist` }</Text>
                <Buttons>
                  <Button text={ `yes` } index={ 0 } onClick={ repeat } autoFocus />
                  <Button text={ `no` } index={ 0 } onClick={ reset } />
                </Buttons>
              </Content>
          }
        </Window>
      );

    case `wait`:
      return (
        <Window theme={ gray } title={ titles[game.status] } modal>
          <Content modal>
            <p>your opponent<br />placing their ships</p>
          </Content>
        </Window>
      );

    case `place`:
    case `confirm`:
      return (
        <Window theme={ teal } title={ titles[game.status] } modal>
          <Content modal>
            <Text>click on field to place<br />or delete ship deck</Text>
            <Text>ships left:</Text>
            <ShipsLeft />
            <Buttons>
              <Button text={ `random` } index={ 0 } onClick={ random } autoFocus />
              <Button text={ `confirm` } index={ 0 } onClick={ game.status === `confirm` && ready } />
            </Buttons>
          </Content>
        </Window>
      );

    default:
      return null;
  }
};

const mapStateToProps = ({ game }) => ({ game });
const mapDispatchToProps = (dispatch) => ({
  repeat: () => dispatch({ type: `REPEAT` }),
  random: () => dispatch({ type: `RANDOM` }),
  ready: () => dispatch({ type: `READY` }),
  reset: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
