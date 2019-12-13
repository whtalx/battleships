import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Person from '../classes/Person';
import teal from '../themes/teal'
import Window from './Window';
import Content from './Content';
import Button from './Button';
import Input from './Input';
import Buttons from './Buttons';
import Text from './Text';

const Select = ({
  game,
  peer,
  disconnect,
  client,
  open,
  setId,
  data,
  initialised,
  setInterface,
  computer,
  person,
}) => {
  const [peerId, setPeerId] = useState(``);

  const join = () => {
    peerId &&
    peerId !== `` &&
    peerId !== peer.id &&
    peer.interface.join(peerId);
  };

  const handleInput = ({ target: { value }}) => {
    setPeerId(value);
  };

  const back = () => {
    setPeerId(``);
    disconnect();
  };

  useEffect(
    () => {
      if (game.status !== `connect` || peer.interface !== null) return;

      setInterface(
        new Person({
          disconnect,
          initialised,
          client,
          setId,
          open,
          data,
        })
      );
    },// eslint-disable-next-line
    [game.status]
  );

  const titles = {
    choose: `select game type`,
    connect: `connect to remote player`,
  };

  const getContent = () => {
    switch (game.status) {
      case `choose`:
        return (
          <Content select>
            <Text>you want to play with</Text>
            <Buttons>
              <Button autoFocus onClick={ person } text={ `person` } index={ 0 }/>
              <Button onClick={ computer } text={ `computer` } index={ 0 }/>
            </Buttons>
          </Content>
        );

      case `connect`:
        return peer.id === ``
          ? <Content select>please wait</Content>
          : (
            <Content select>
              <Text>share this code with someone you want to play:</Text>
              <Input symbols={ peer.id.length } value={ peer.id } readonly/>
              <Text>or paste code that was shared to you:</Text>
              <Input onInput={ handleInput } submit={ join } symbols={ peerId.length }/>
              <Buttons>
                <Button onClick={ join } text={ `connect` }/>
                <Button onClick={ back } text={ `back` }/>
              </Buttons>
            </Content>
          );

      default:
        return null;
    }
  };

  return (
    <Window title={ titles[game.status] } theme={ teal }>
      { getContent() }
    </Window>
  );
};

const mapStateToProps = ({ game, peer }) => ({ game, peer });
const mapDispatchToProps = (dispatch) => ({
  disconnect: () => dispatch({ type: `RESET` }),
  client: () => dispatch({ type: `SET_IS_CLIENT` }),
  open: () => dispatch({ type: 'SET_IS_CONNECTED' }),
  setId: (payload) => dispatch({ type: `SET_ID`, payload }),
  data: (payload) => dispatch({ type: `RECEIVE`, payload }),
  initialised: () => dispatch({ type: `SET_IS_INITIALISED` }),
  setInterface: (payload) => dispatch({ type: `SET_INTERFACE`, payload }),
  computer: () => dispatch({ type: `SELECT_TYPE`, payload: false }),
  person: () => dispatch({ type: `SELECT_TYPE`, payload: true }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
