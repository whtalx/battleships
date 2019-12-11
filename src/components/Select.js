import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Person from '../classes/Person';
import Input from './Input';
import Button from './Button';

const Wrapper = styled.div`
  margin: 16px 0;
  padding: 8px 4px;
  width: 320px;
  max-width: 80%;
  position: relative;
  background-color: var(--teal);
  box-shadow: 16px 16px 0 var(--black);
  color: var(--black);

  :before {
    content: '${ props => props.title_ }';
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
  padding: 32px 0;
  height: 100%;
  box-sizing: border-box;
  min-height: 294px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border: 3px double var(--black);
`;

const Buttons = styled.div`
  margin-top: 32px;
`;

const Select = (props) => {
  const [peerId, setPeerId] = useState(``);

  const join = () => {
    peerId &&
    peerId !== `` &&
    peerId !== props.peer.id &&
    props.peer.interface.join(peerId);
  };

  const handleInput = ({ target: { value }}) => {
    setPeerId(value);
  };

  const back = () => {
    setPeerId(``);
    props.handleDisconnect();
  };

  useEffect(
    () => {
      if (props.game.status !== `connect`) return;

      props.peer.interface === null && props.setInterface(
        new Person({
          disconnect: props.disconnect,
          initialised: props.initialised,
          client: props.client,
          setId: props.setId,
          open: props.open,
          data: props.data,
        })
      );
    },
    [props]
  );

  switch (props.game.status) {
    case `choose`:
      return (
        <Wrapper title_={ `select game type` }>
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
      return props.peer.id === ``
        ? (
          <Wrapper title_={ `connect to remote player` }>
            <Content>please wait</Content>
          </Wrapper>
        )
        : (
          <Wrapper title_={ `connect to remote player` }>
            <Content>
              <label>share this code<br />with someone<br />you want to play:</label>
              <Input symbols={ props.peer.id.length } value={ props.peer.id } readonly />
              <label>or paste code that<br />was shared to you:</label>
              <Input onInput={ handleInput } submit={ join } symbols={ peerId.length } />
              <Buttons>
                <Button onClick={ join } text={ `connect` } />
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
  peer: state.peer,
});

const mapDispatchToProps = (dispatch) => ({
  disconnect: () => dispatch({ type: `RESET` }),
  client: () => dispatch({ type: `SET_IS_CLIENT` }),
  setId: (payload) => dispatch({ type: `SET_ID`, payload }),
  data: (payload) => dispatch({ type: `RECEIVE`, payload }),
  open: () => dispatch({ type: 'SET_IS_CONNECTED' }),
  initialised: () => dispatch({ type: `SET_IS_INITIALISED` }),
  setInterface: (payload) => dispatch({ type: `SET_INTERFACE`, payload }),
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
