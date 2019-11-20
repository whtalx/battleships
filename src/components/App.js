import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Ally from './Ally';
import Enemy from './Enemy';
import Ocean from './Ocean';
import Select from './Select';
import Placing from './Placing';
import TextBlock from "./TextBlock";

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
          props.sea.shipsToPlace.total === 0 && props.changeStatus(`confirm`);
          break;
        }

        case `confirm`: {
          if (props.sea.shipsToPlace.total !== 0) {
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
          props.sea.feedback && props.send(props.sea.feedback);
          break;
        }

        case `defeat`:
        case `victory`: {
          props.game.isAllyWantRepeat && props.game.isEnemyWantRepeat && props.newRound();
          break;
        }

        default: break;
      }
    },
    [props]
  );

  switch (props.game.status) {
    case `choose`:
    case `connect`:
      return <Select />;

    case `place`:
    case `confirm`:
      return (
        <Ocean>
          <Ally />
          <Placing />
        </Ocean>
      );

    case `victory`:
    case `wait`:
      return (
        <Ocean>
          <Ally />
          <TextBlock />
        </Ocean>
      );

    case `play`:
      return (
        <Ocean>
          <Ally />
          <Enemy />
        </Ocean>
      );

    case `defeat`:
      return (
        <Ocean>
          <TextBlock />
          <Enemy />
        </Ocean>
      );

    default:
      return null;
  }
};

const mapStateToProps = (state) => ({
  game: state.game,
  rtc: state.rtc,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  changeStatus: (status) => dispatch({ type: `CHANGE_STATUS`, payload: status }),
  setMove: (payload) => dispatch({ type: `SET_MOVE`, payload }),
  send: (payload) => dispatch({ type: `SEND`, payload }),
  newRound: () => dispatch({ type: `NEW_ROUND` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
