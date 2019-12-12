import send from '../actions/send';
import setId from '../actions/setId';
import newRound from '../actions/newRound';
import receive from '../actions/receive';
import setIsClient from '../actions/setIsClient';
import setInterface from '../actions/setInterface';
import clearMessage from '../actions/clearMessage';
import setIsConnected from '../actions/setIsConnected';
import setIsInitialised from '../actions/setIsInitialised';

/**
 * id                 -- id on Peer.js
 * message            -- message formed for sending
 * interface          -- Person for pvp and Machine for comp
 * isClient           -- flag shows that current peer did not create session
 * isConnected        -- flag shows that both peers connected to session
 * isInitialised      -- flag shows that current interface was successfully initialized
 * waitingForFeedback -- flag prevents firing more than once at time (happens with slow network)
 * lastSent           -- id of last sent cell (for highlighting in enemy sea)
 * lastReceived       -- id of last received cell (for highlighting in ally sea)
 */

 const initialState = () => ({
  id: ``,
  message: null,
  interface: null,
  isClient: false,
  isConnected: false,
  isInitialised: false,
  waitingForFeedback: false,
  lastSent: null,
  lastReceived: null,
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case `SET_INTERFACE`:
      return setInterface(state, action);

    case `SEND`:
      return send(state, action);

    case `CLEAR_MESSAGE`:
      return clearMessage(state);

    case `READY`:
      return send(state, { payload: { type: `ready` }});

    case `REPEAT`:
      return send(state, { payload: { type: `repeat` }});

    case `RECEIVE`:
      return receive(state, action);

    case `SET_ID`:
      return setId(state, action);

    case `SET_IS_CLIENT`:
      return setIsClient(state);

    case `SET_IS_CONNECTED`:
      return setIsConnected(state);

    case `SET_IS_INITIALISED`:
      return setIsInitialised(state);

    case `RESET`:
      return initialState();

    case `NEW_ROUND`:
      return newRound(state);

    default: return state;
  }
};
