import send from '../actions/send';
import setRTC from '../actions/setRTC';
import receive from '../actions/receive';
import setPeerID from '../actions/setPeerID';
import setIsConnected from '../actions/setIsConnected';
import setIsInitialised from '../actions/setIsInitialised';

/**
 * peerID -- ...
 * interface -- ...
 * isClient -- ...
 * isConnected -- ...
 * isInitialised -- ...
 * waitingForFeedback -- bool to prevent firing more than once (happens with slow network)
 */

 const initialState = () => ({
  peerID: '',
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
