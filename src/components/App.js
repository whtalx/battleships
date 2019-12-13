import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Machine from '../classes/Machine';
import Game from './Game';

const App = ({
  game,
  peer,
  sea,
  changeStatus,
  selectType,
  setFirstMove,
  setInterface,
  post,
  clearMessage,
  send,
  connect,
  newRound,
  random,
  repeat,
  ready,
  reset,
}) => {
  const handleKeyPress = (event) => {
    switch (game.status) {
      case `choose`: {
        const key = event.key.toLowerCase();
        key === `p` && selectType(true);
        key === `c` && selectType(false);
        return;
      }

      case `place`: {
        event.key.toLowerCase() === `r` && random();
        return;
      }

      case `confirm`: {
        const key = event.key.toLowerCase();
        key === `r` && random();
        key === `c` && ready();
        return;
      }

      case `defeat`:
      case `victory`: {
        const key = event.key.toLowerCase();
        key === `y` && repeat();
        key === `n` && reset();
        return;
      }

      default: return;
    }
  };

  useEffect(
    () => {
      document.removeEventListener(`keypress`, handleKeyPress);

      switch (game.status) {
        case `choose`: {
          document.addEventListener(`keypress`, handleKeyPress);
          break;
        }

        case `connect`: {
          if (peer.isConnected) {
            setFirstMove(peer.isClient);
            changeStatus(`place`);
          }
          break;
        }

        case `place`: {
          game.type === `comp` &&
          peer.interface === null &&
          setInterface(
            new Machine({ connect, post })
          );

          sea.shipsToPlace === 0 && changeStatus(`confirm`);
          document.addEventListener(`keypress`, handleKeyPress);
          break;
        }

        case `confirm`: {
          if (sea.shipsToPlace !== 0) {
            changeStatus(`place`);
            break;
          }

          if (game.isAllyReady) {
            changeStatus(game.isEnemyReady ? `play` : `wait`);
            break;
          }

          document.addEventListener(`keypress`, handleKeyPress);
          break;
        }

        case `wait`: {
          game.isEnemyReady && changeStatus(`play`);
          break;
        }

        case `play`: {
          break;
        }

        case `defeat`:
        case `victory`: {
          if (game.isAllyWantRepeat) {
            game.isEnemyWantRepeat && newRound();
            break;
          }

          document.addEventListener(`keypress`, handleKeyPress);
          break;
        }

        default: break;
      }

      if (peer.message) {
        peer.interface.send(peer.message);
        clearMessage();
      } else if (sea.feedback) {
        send(sea.feedback);
      }

      return () => document.removeEventListener(`keypress`, handleKeyPress);
    },// eslint-disable-next-line
    [
      game.status,
      game.isAllyReady,
      game.isEnemyReady,
      game.isAllyWantRepeat,
      game.isEnemyWantRepeat,
      peer.isConnected,
      peer.message,
      sea.feedback,
      sea.shipsToPlace,
    ]
  );

  return <Game />;
};

const mapStateToProps = (props) => ({ ...props });
const mapDispatchToProps = (dispatch) => ({
  changeStatus: (status) => dispatch({ type: `CHANGE_STATUS`, payload: status }),
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
  setFirstMove: (payload) => dispatch({ type: `SET_FIRST_MOVE`, payload }),
  setInterface: (payload) => dispatch({ type: `SET_INTERFACE`, payload }),
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
