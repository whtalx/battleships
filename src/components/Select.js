import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RTC from '../scripts/RTC';
import Input from './Input';
import Button from './Button';

const Wrapper = styled.div`
  padding: 8px 4px;
  width: 320px;
  max-width: 80%;
  position: relative;
  background-color: var(--teal);
  box-shadow: 16px 16px 0 var(--black);
  color: var(--black);

  :before {
    content: '${ props => props.title }';
    padding: 0 8px;
    position: absolute;
    top: 2px;
    left: 50%;
    width: max-content;
    height: 16px;
    background-color: inherit;
    color: inherit;
    transform: translateX(-50%);
    z-index: 1;
  }
`;

const Content = styled.div`
  padding: 32px 12px;
  min-height: 224px;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 3px double var(--black);
`;

const Buttons = styled.div`
  margin-top: 32px;
`;

const Select = (props) => {
  const [peerID, changePeerID] = useState(``);
  const setRTC = (id, isClient = false, isInitialised = false) =>
    props.setRTC({
      interface: new RTC({
        peerID: id,
        setPeerID: props.setPeerID,
        setIsConnected: props.setIsConnected,
        setIsInitialised: props.setIsInitialised,
        receive: props.receive,
        handleDisconnect: props.handleDisconnect,
      }),
      isClient,
      isInitialised,
    });
  const connect = (id = peerID) => id && id !== `` && id !== props.rtc.peerID && setRTC(id, true);
  const handleInput = (event) => changePeerID(event.target.value);
  const handleKeyPress = (event) => {
    if (props.game.status !== `choose`) return;

    (event.key === `p` || event.key === `P`) && props.selectType(true);
    (event.key === `c` || event.key === `C`) && props.selectType(false);
  };
  const back = () => {
    changePeerID(``);
    props.handleDisconnect();
  };

  useEffect(
    () => {
      if (props.game.status !== `connect`) return;

      if (props.rtc.interface === null) {
        setRTC(props.rtc.peerID);
      } else if (!props.rtc.isInitialised){
        props.rtc.interface.init();
        props.rtc.isClient && props.rtc.interface.join();
      }
    },// eslint-disable-next-line
    [props]
  );

  switch (props.game.status) {
    case `choose`:
      return (
        <Wrapper title={ `SELECT GAME TYPE` } onKeyPress={ handleKeyPress }>
          <Content>
            <p>you want to play with</p>
            <Buttons>
              <Button autoFocus onClick={ () => { props.selectType(true) }} text={ `person` } index={ 0 } />
              <Button onClick={ () => { props.selectType(false) }} text={ `computer` } index={ 0 } />
            </Buttons>
          </Content>
        </Wrapper>
    );

    case `connect`:
      return props.rtc.peerID === ``
        ? (
          <Wrapper title={ `CONNECT TO REMOTE PLAYER` }>
            <Content>please wait</Content>
          </Wrapper>
        )
        : (
          <Wrapper title={ `CONNECT TO REMOTE PLAYER` } onKeyPress={ handleKeyPress }>
            <Content>
              <label>share this code<br />with someone<br />you want to play:</label>
              <Input symbols={ props.rtc.peerID.length } value={ props.rtc.peerID } readonly />
              <label>or paste code that<br />was shared to you:</label>
              <Input onInput={ handleInput } submit={ connect } symbols={ peerID.length } />
              <Buttons>
                <Button onClick={ () => { connect() }} text={ `connect` } />
                <Button onClick={ back } text={ `back` } />
              </Buttons>
            </Content>
          </Wrapper>
        );

    default: return null;
  }
};

const mapStateToProps = (state) => ({
  game: state.game,
  rtc: state.rtc,
});

const mapDispatchToProps = (dispatch) => ({
  setRTC: (payload) => dispatch({ type: `SET_RTC`, payload }),
  receive: (payload) => dispatch({ type: `RECEIVE`, payload }),
  setPeerID: (payload) => dispatch({ type: `SET_PEER_ID`, payload }),
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
  setIsConnected: (payload) => dispatch({ type: 'SET_IS_CONNECTED', payload }),
  setIsInitialised: (payload) => dispatch({ type: `SET_IS_INITIALISED`, payload }),
  handleDisconnect: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
