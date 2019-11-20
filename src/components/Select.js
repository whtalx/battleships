import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RTC from '../scripts/RTC';
import TextButton from './TextButton';

const StyledSelect = styled.div`
  width: 100%;
  height: 100%;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  display: flex;

  label {
    text-align: center;
    user-select: none;
  }

  p {
    min-height: 1em;
    outline: 1px dotted #555;
  }

  button {
    margin: 16px 16px;
    width: 108px;
    height: 64px;
  }
`;

const Output = styled.input`
  background-color: #000;
  border: none;
  color: inherit;
  outline: none;
  font-size: inherit;
  font-weight: 300;
  text-align: center;
  border-radius: 0;
`;

const Input = styled(Output)`
  border-bottom: 1px solid #aaa;
`;

const Button = styled.button`
  font-family: 'Material Icons';
`;

const Select = (props) => {
  const input = useRef(null);
  const output = useRef(null);
  const [selected, setSelected] = useState(false);
  const [pasted, setPasted] = useState(false);

  useEffect(
    () => {
      if (props.game.status !== `connect`) return;

      if (props.rtc.interface === null) {
        setRTC(props.rtc.peerID);
      } else if (!props.rtc.isInitialised){
        props.rtc.interface.init();
        props.rtc.isClient && props.rtc.interface.join();
      } else if (props.rtc.peerID && !selected) {
        output.current.focus();
        output.current.select();
      }
    },// eslint-disable-next-line
    [props]
  );

  function getID() {
    const id = input.current.value;
    if (!id || id === '' || id === props.rtc.peerID) return;
    setRTC(id, true, false);
  }

  function setRTC(id, isClient = false, isInitialised = false) {
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
  }

  function handleChange(event) {
    event.preventDefault();
  }

  function handleSelect() {
    setSelected(true);
  }

  function handleKeyPress(event) {
    event.key === `Enter` && getID();
  }

  switch (props.game.status) {
    case `choose`: return (
      <StyledSelect>
        <label>select game type:</label>
        <div>
          <Button onClick={ () => props.selectType(true) }>&#xE7FD;&#xE8D4;&#xE7FD;</Button>
          {/*<Button onClick={ () => props.selectType(false) }>&#xE7FD;&#xE8D4;&#xE30A;</Button>*/}
        </div>
      </StyledSelect>
    );

    case `connect`: return (
      <StyledSelect>
        <label>copy this text and share<br />with someone you want to play:</label>
        <Output type="text" size="20" ref={ output } value={ props.rtc.peerID } onChange={ handleChange } onSelect={ handleSelect }/>
        <label>or paste text<br />that was shared to you:</label>
        <Input type="text" size="16" ref={ input } onChange={ () => setPasted(true)} onKeyPress={ handleKeyPress } />
        { pasted && <label><TextButton onClick={ getID }>connect</TextButton></label> }
      </StyledSelect>
    );

    default: return null;
  }
};

const mapStateToProps = (state) => ({
  game: state.game,
  rtc: state.rtc,
});

const mapDispatchToProps = (dispatch) => ({
  receive: (payload) => dispatch({ type: `RECEIVE`, payload }),
  setRTC: (payload) => dispatch({ type: `SET_RTC`, payload }),
  setPeerID: (payload) => dispatch({ type: `SET_PEER_ID`, payload }),
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
  setIsInitialised: (payload) => dispatch({ type: `SET_IS_INITIALISED`, payload }),
  setIsConnected: (payload) => dispatch({ type: 'SET_IS_CONNECTED', payload }),
  handleDisconnect: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
