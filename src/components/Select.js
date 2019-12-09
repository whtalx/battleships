import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RTC from '../scripts/RTC';
import Input from './Input';
import TextButton from './TextButton';

const Wrapper = styled.div`
  padding: 8px 4px;
  width: 320px;
  max-width: 60%;
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
    height: 16px;
    background-color: inherit;
    color: inherit;
    transform: translateX(-50%);
    z-index: 1;
  }
`;

const Content = styled.div`
  padding: 32px;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 3px double var(--black);
`;

const Buttons = styled.div`
  margin-top: 32px;
  height: 24px;
`;

const Button = styled.button`
  margin: 0 8px 8px 0;
  padding: 0 16px;
  height: 16px;
  background-color: var(--white);
  box-shadow: 8px 8px 0 var(--black);
  color: var(--gray);

  :focus {
    background-color: var(--yellow);
    color: var(--maroon);
  }

  :nth-child(n + 1) {
    margin-left: 16px;
  }

  span {
    color: var(--black);
  }
`;

const Select = (props) => {
  const pvp = useRef(null);
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
  const preventDefault = (event) => { event.preventDefault() };
  const handleChange = () => setChanged(true);
  const handleSelect = () => setSelected(true);
  const handleClick = () => { connect() };
  const handleKeyPress = (event) => {
    if (props.game.status === `choose`) {
      event.key === `p` && props.selectType(true);
      event.key === `c` && props.selectType(false);
    } else if (props.game.status === `connect`) {
      event.key === `Enter` && connect();
    };
  };

  useEffect(
    () => {
      pvp.current.focus();
    },
    [],
  );

  useEffect(
    () => {
      if (props.game.status !== `connect`) return;

      if (props.rtc.interface === null) {
        setRTC(props.rtc.peerID);
      } else if (!props.rtc.isInitialised){
        props.rtc.interface.init();
        props.rtc.isClient && props.rtc.interface.join();
      } else if (props.rtc.peerID && !selected) {
        // output.current.select();
      }
    },// eslint-disable-next-line
    [props]
  );

  switch (props.game.status) {
    case `choose`:
      return (
        <Wrapper title="SELECT GAME TYPE" onKeyPress={ handleKeyPress }>
          <Content>
            <p>you want to play with</p>
            <Buttons>
              <Button ref={ pvp } onClick={ () => { props.selectType(true) }}><span>p</span>erson</Button>
              <Button onClick={ () => { props.selectType(false) }}><span>c</span>omputer</Button>
            </Buttons>
          </Content>
        </Wrapper>
    );

    case `connect`:
      return (
        <Wrapper title="CONNECT TO REMOTE PLAYER">
          <Content>
            <label>share this text<br />with someone<br />you want to play:</label>
            <Input ref={ output } onChange={ preventDefault } onSelect={ handleSelect } value={ props.rtc.peerID } />
            <label>or paste text that<br />was shared to you:</label>
            <Input ref={ input } onChange={ handleChange } />
            <label>{ changed && <TextButton onClick={ handleClick }>connect</TextButton> }</label>
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
