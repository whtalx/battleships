import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AI from '../scripts/AI';
import Game from './Game';

const App = (props) => {
  useEffect(
    () => {
      switch (props.game.status) {
        case `connect`: {
          if (props.rtc.isConnected) {
            props.changeStatus(`place`);
            props.setMove(props.rtc.isClient);
          }
          break;
        }

        case `place`: {
          if (props.game.type === `comp`) {
            if (props.rtc.interface === null) {
              props.setRTC({
                interface: new AI({
                  setIsConnected: props.setIsConnected,
                  receive: props.receive,
                })
              });
            } else if (!props.rtc.isConnected) {
              props.rtc.interface.init();
            }
          }
          props.sea.shipsToPlace === 0 && props.changeStatus(`confirm`);
          break;
        }

        case `confirm`: {
          if (props.sea.shipsToPlace !== 0) {
            props.changeStatus(`place`);
            break;
          }

          props.game.isAllyReady && (
            props.game.isEnemyReady
              ? props.changeStatus(`play`)
              : props.changeStatus(`wait`)
          );
          break;
        }

        case `wait`: {
          props.game.isEnemyReady && props.changeStatus(`play`);
          break;
        }

        case `play`: {
          break;
        }

        case `defeat`:
        case `victory`: {
          props.game.isAllyWantRepeat && props.game.isEnemyWantRepeat && props.newRound();
          break;
        }

        default: break;
      }

      if (props.rtc.message) {
        props.rtc.interface.send(props.rtc.message);
        props.clearMessage();
      } else if (props.sea.feedback) {
        props.send(props.sea.feedback);
      }
    },
    [props]
  );

  return <Game />;
};

const mapStateToProps = (state) => ({
  game: state.game,
  rtc: state.rtc,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  changeStatus: (status) => dispatch({ type: `CHANGE_STATUS`, payload: status }),
  setIsConnected: (payload) => dispatch({ type: 'SET_IS_CONNECTED', payload }),
  setMove: (payload) => dispatch({ type: `SET_MOVE`, payload }),
  receive: (payload) => dispatch({ type: `RECEIVE`, payload }),
  setRTC: (payload) => dispatch({ type: `SET_RTC`, payload }),
  send: (payload) => dispatch({ type: `SEND`, payload }),
  clearMessage: () => dispatch({ type: `CLEAR_MESSAGE` }),
  newRound: () => dispatch({ type: `NEW_ROUND` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
