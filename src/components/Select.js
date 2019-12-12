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
    props.disconnect();
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

  const titles = {
    choose: `select game type`,
    connect: `connect to remote player`,
  };

  const getContent = () => {
    switch (props.game.status) {
      case `choose`:
        return [
          <Text key={ `text` }>you want to play with</Text>,
          <Buttons key={ `buttons` }>
            <Button autoFocus onClick={() => { props.selectType(true) }} text={ `person` } index={ 0 }/>
            <Button onClick={() => { props.selectType(false) }} text={ `computer` } index={ 0 }/>
          </Buttons>
        ];

      case `connect`:
        return props.peer.id === ``
          ? `please wait`
          : [
            <Text key={ `text-input` }>share this code with someone you want to play:</Text>,
            <Input key={ `output` } symbols={ props.peer.id.length } value={ props.peer.id } readonly/>,
            <Text key={ `text-output` }>or paste code that was shared to you:</Text>,
            <Input key={ `input` } onInput={ handleInput } submit={ join } symbols={ peerId.length }/>,
            <Buttons key={ `buttons` }>
              <Button onClick={ join } text={ `connect` }/>
              <Button onClick={ back } text={ `back` }/>
            </Buttons>,
          ];

      default:
        return null;
    }
  };

  return (
    <Window title={ titles[props.game.status] } theme={ teal }>
      <Content>
        { getContent() }
      </Content>
    </Window>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
  peer: state.peer,
});

const mapDispatchToProps = (dispatch) => ({
  disconnect: () => dispatch({ type: `RESET` }),
  client: () => dispatch({ type: `SET_IS_CLIENT` }),
  open: () => dispatch({ type: 'SET_IS_CONNECTED' }),
  setId: (payload) => dispatch({ type: `SET_ID`, payload }),
  data: (payload) => dispatch({ type: `RECEIVE`, payload }),
  initialised: () => dispatch({ type: `SET_IS_INITIALISED` }),
  setInterface: (payload) => dispatch({ type: `SET_INTERFACE`, payload }),
  selectType: (network) => dispatch({ type: `SELECT_TYPE`, payload: network }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
