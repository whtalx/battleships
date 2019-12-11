import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Machine from '../classes/Machine';
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
          if (props.peer.isConnected) {
            props.setMove(props.peer.isClient);
            props.changeStatus(`place`);
          }
          break;
        }

        case `place`: {
          props.game.type === `comp` && props.peer.interface === null && props.setInterface(
            new Machine({
              connect: props.connect,
              post: props.post,
            })
          );

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

      if (props.peer.message) {
        props.peer.interface.send(props.peer.message);
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
  peer: state.peer,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  changeStatus: (status) => dispatch({ type: `CHANGE_STATUS`, payload: status }),
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
  setInterface: (payload) => dispatch({ type: `SET_INTERFACE`, payload }),
  setMove: (payload) => dispatch({ type: `SET_MOVE`, payload }),
  post: (payload) => dispatch({ type: `RECEIVE`, payload }),
  clearMessage: () => dispatch({ type: `CLEAR_MESSAGE` }),
  send: (payload) => dispatch({ type: `SEND`, payload }),
  connect: () => dispatch({ type: 'SET_IS_CONNECTED' }),
  newRound: () => dispatch({ type: `NEW_ROUND` }),
  random: () => dispatch({ type: `RANDOM` }),
  repeat: () => dispatch({ type: `REPEAT` }),
  ready: () => dispatch({ type: `READY` }),
  reset: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
