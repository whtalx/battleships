import send from '../actions/send';
import setRTC from '../actions/setRTC';
import receive from '../actions/receive';
import setPeerID from '../actions/setPeerID';
import clearMessage from '../actions/clearMessage';
import setIsConnected from '../actions/setIsConnected';
import setIsInitialised from '../actions/setIsInitialised';

/**
 * peerID             -- id on Peer.js sercer
 * interface          -- Peer.js or AI
 * isClient           -- flag shows that current peer did not create session
 * isConnected        -- flag shows connecting to session status
 * isInitialised      -- flag shows that init function of current interface was called
 * waitingForFeedback -- flag prevent firing more than once (happens with slow network)
 */

 const initialState = () => ({
  peerID: '',
  message: null,
  interface: null,
  isClient: false,
  isConnected: false,
  isInitialised: false,
  waitingForFeedback: false,
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case `SET_RTC`:
      return setRTC(state, action);

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

    case `SET_PEER_ID`:
      return setPeerID(state, action);

    case `SET_IS_CONNECTED`:
      return setIsConnected(state, action);

    case `SET_IS_INITIALISED`:
      return setIsInitialised(state, action);

    case `RESET`:
      return initialState();

    default: return state;
  }
};
