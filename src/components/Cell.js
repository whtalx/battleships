import React from 'react';
import styled, { css } from 'styled-components';

const Cell = styled.div`
  box-sizing: border-box;
  background-color: #000;
  background-clip: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 110% 110%;

  ${
    props => props.grid && css`
      outline: 1px dotted #222;
    `
  }

  ${
    props => ((props.ship && !props.sank) || props.place) && css`
      outline: 1px solid #aaa;
      z-index: 1;
    `
  }

  ${
    props => ((props.hit && !props.sank) || props.times) && css`
      background-image: var(--hit);
    `
  }

  ${
    props => props.sank && css`
      outline: 1px solid #555;
      background-image: var(--sank);
      z-index: 1;
    `
  }

  ${
    props => props.miss && css`
      background-image: var(--miss);
    `
  }

  ${
    props => props.enemy && props.move && !props.miss && !props.hit && !props.ship && css`
      :hover {
        background-image: var(--hover);
      }
    `
  }
`;

export default (props) => {
  const params = {
    move: props.move,
    enemy: props.enemy,
    place: props.place,
    times: props.times,
    children: props.children,
    className: props.className,
    hit: props.data && props.data.hit,
    miss: props.data && props.data.miss,
    sank: props.data && props.data.sank,
    ship: props.data && props.data.ship,
    grid: props.data && !props.ship
  };

  const handleClick = () => {
    props.onClick &&
    (props.enemy === props.move) &&
    !props.data.hit &&
    !props.data.miss &&
    props.onClick(props.data.id);
  };

  return <Cell onClick={ handleClick } { ...params } />
}
