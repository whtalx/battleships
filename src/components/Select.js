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
  font-size: 30px;
  display: flex;

  label {
    text-align: center;
    min-height: 1.2em;
    line-height: 1.2em;
    user-select: none;
  }
`;

const Output = styled.input.attrs({
  type: `text`,
})`
  max-width: 90%;
  min-height: 1.5em;
  background-color: #000;
  border: none;
  border-radius: 0;
  outline: none;
  color: #ddd;
  font-size: inherit;
  font-weight: 300;
  line-height: 1.5em;
  text-align: center;
`;

const Input = styled(Output)`
  border-bottom: 1px solid #aaa;
`;

const Button = styled.button`
  margin: 16px 16px;
  width: 108px;
  height: 64px;
  font-family: 'Material Icons';
`;

const Select = (props) => {
  const input = useRef(null);
  const output = useRef(null);
  const [changed, setChanged] = useState(false);
  const [selected, setSelected] = useState(false);
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
  const connect = (id = input.current.value) => id && id !== '' && id !== props.rtc.peerID && setRTC(id, true);
  const handleKeyPress = (event) => { event.key === `Enter` && connect() };
  const preventDefault = (event) => { event.preventDefault() };
  const handleChange = () => setChanged(true);
  const handleSelect = () => setSelected(true);
  const handleClick = () => { connect() };

  useEffect(
    () => {
      if (props.game.status !== `connect`) return;

      if (props.rtc.interface === null) {
        setRTC(props.rtc.peerID);
      } else if (!props.rtc.isInitialised){
        props.rtc.interface.init();
        props.rtc.isClient && props.rtc.interface.join();
      } else if (props.rtc.peerID && !selected) {
        output.current.select();
      }
    },// eslint-disable-next-line
    [props]
  );

  switch (props.game.status) {
    case `choose`:
      return (
        <StyledSelect>
          <label>select game type:</label>
          <div>
            <Button onClick={ () => props.selectType(true) }>&#xE7FD;&#xE8D4;&#xE7FD;</Button>
            {/*<Button onClick={ () => props.selectType(false) }>&#xE7FD;&#xE8D4;&#xE30A;</Button>*/}
          </div>
        </StyledSelect>
    );

    case `connect`:
      return (
        <StyledSelect>
          <label>share this text<br />with someone<br />you want to play:</label>
          <Output ref={ output } onChange={ preventDefault } onSelect={ handleSelect } value={ props.rtc.peerID } />
          <label>or paste text that<br />was shared to you:</label>
          <Input ref={ input } onChange={ handleChange } onKeyPress={ handleKeyPress } />
          <label>{ changed && <TextButton onClick={ handleClick }>connect</TextButton> }</label>
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
  setRTC: (payload) => dispatch({ type: `SET_RTC`, payload }),
  receive: (payload) => dispatch({ type: `RECEIVE`, payload }),
  setPeerID: (payload) => dispatch({ type: `SET_PEER_ID`, payload }),
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
  setIsConnected: (payload) => dispatch({ type: 'SET_IS_CONNECTED', payload }),
  setIsInitialised: (payload) => dispatch({ type: `SET_IS_INITIALISED`, payload }),
  handleDisconnect: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
