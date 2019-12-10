import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AI from '../scripts/AI';
import Game from './Game';

const App = (props) => {
  const handleKeyPress = (event) => {
    const key = event.key.toLowerCase();

    switch (props.game.status) {
      case `choose`: {
        key === `p` && props.selectType(true);
        key === `c` && props.selectType(false);
        break;
      }

      case `place`: {
        key === `r` && props.random();
        break;
      }

      case `confirm`: {
        key === `r` && props.random();
        key === `c` && props.ready();
        break;
      }

      case `defeat`:
      case `victory`: {
        key === `y` && props.repeat();
        key === `n` && props.reset();
        break;
      }

      default: break;
    }
  };

  useEffect(
    () => {
      document.removeEventListener(`keypress`, handleKeyPress);

      switch (props.game.status) {
        case `choose`: {
          document.addEventListener(`keypress`, handleKeyPress);
          break;
        }

        case `connect`: {
          if (props.rtc.isConnected) {
            props.setMove(props.rtc.isClient);
            props.changeStatus(`place`);
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
          document.addEventListener(`keypress`, handleKeyPress);
          break;
        }

        case `confirm`: {
          if (props.sea.shipsToPlace !== 0) {
            props.changeStatus(`place`);
            break;
          }

          if (props.game.isAllyReady) {
            props.changeStatus(props.game.isEnemyReady ? `play` : `wait`);
            break;
          }

          document.addEventListener(`keypress`, handleKeyPress);
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
          if (props.game.isAllyWantRepeat) {
            props.game.isEnemyWantRepeat && props.newRound();
            break;
          }

          document.addEventListener(`keypress`, handleKeyPress);
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

      return () => document.removeEventListener(`keypress`, handleKeyPress);
    },// eslint-disable-next-line
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
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
  setMove: (payload) => dispatch({ type: `SET_MOVE`, payload }),
  receive: (payload) => dispatch({ type: `RECEIVE`, payload }),
  setRTC: (payload) => dispatch({ type: `SET_RTC`, payload }),
  clearMessage: () => dispatch({ type: `CLEAR_MESSAGE` }),
  send: (payload) => dispatch({ type: `SEND`, payload }),
  newRound: () => dispatch({ type: `NEW_ROUND` }),
  random: () => dispatch({ type: `RANDOM` }),
  repeat: () => dispatch({ type: `REPEAT` }),
  ready: () => dispatch({ type: `READY` }),
  reset: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
