import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';

const Window = styled.div`
  margin: 8px;
  width: calc(50vmin - 20px);
  height: calc(50vmin - 20px);
  min-width: 292px;
  min-height: 292px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 8px 4px;
  margin: -16px 0 0 -16px;
  width: 270px;
  height: 270px;
  box-sizing: border-box;
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
  padding: 16px 0;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  border: 3px double var(--black);
`;

const Text = styled.div`
  margin-top: 4em;
  width: 100%;
  line-height: 2.5em;
  text-align: center;
`;

const Buttons = styled.div`
`;

const Modal = (props) => {
  const resultText = {
    victory: `you win!`,
    defeat: `you loose!`,
  };

  const handleKeyPress = (event) => {
    event.key.toLowerCase() === `y` && props.repeat();
    event.key.toLowerCase() === `n` && props.reset();
  };

  switch (props.game.status) {
    case `defeat`:
    case `victory`:
      return props.game.isAllyWantRepeat
        ? (
          <Window>
            <Wrapper title_={ resultText[props.game.status] }>
              <Content>
                <Text>
                  please wait for your opponent to answer
                </Text>
              </Content>
            </Wrapper>
          </Window>
        )
        : (
          <Window>
            <Wrapper title_={ resultText[props.game.status] } onKeyPress={ handleKeyPress }>
              <Content>
                <Text>
                  { !props.game.isAllyWantRepeat && `play another round?` }<br />
                  { props.game.type === `pvp` && props.game.isEnemyWantRepeat && `your opponent insist` }
                </Text>
                <Buttons>
                  <Button text={ `yes` } index={ 0 } onClick={ props.repeat } autoFocus />
                  <Button text={ `no` } index={ 0 } onClick={ props.reset } />
                </Buttons>
              </Content>
            </Wrapper>
          </Window>
        );

    case `wait`:
      return (
        <Window>
          <Wrapper title_={ `please wait` }>
            <Content>
              <Text>
                your opponent<br/>placing their ships
              </Text>
            </Content>
          </Wrapper>
        </Window>
      );

    default:
      return null;
  }
};

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  repeat: () => dispatch({ type: `REPEAT` }),
  reset: () => dispatch({ type: `RESET` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
