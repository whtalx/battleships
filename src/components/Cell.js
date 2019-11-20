import React from 'react';
import styled, { css } from 'styled-components';

const Cell = styled.div`
  margin: 0 -1px -1px 0;
  box-sizing: border-box;
  background-clip: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;


  ${
    props => (!props.place && !props.ship) && css`
      :nth-child(n + 11) {
        border-top: 1px dotted #333;
      }

      :not(:nth-child(10n + 1)) {
        border-left: 1px dotted #333;
      }
    `
  }

  ${
    props => props.ship && css`
      z-index: 1;
      border-color: #aaa;
      border-style: solid;
      border-width: 0;

      :nth-child(n + 11) {
        border-top-width: 1px;
      }

      :not(:nth-child(10n + 1)) {
        border-left-width: 1px;
      }

      :not(:nth-child(10n + 10)) {
        border-right-width: 1px;
      }

      :not(:nth-child(n + 91)) {
        border-bottom-width: 1px;
      }
    `
  }

  ${
    props => props.place && css`
      border: 1px solid #aaa;
    `
  }

  ${
    props => (props.hit || props.times) && (
      props.sank
        ? css`
          border-color: #333;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzAgMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTU1IiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBMMzAgMzBaTTAgMzBMMzAgMFoiLz48L3N2Zz4=);
        `
        : css`
          background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzAgMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYWFhIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBMMzAgMzBaTTAgMzBMMzAgMFoiLz48L3N2Zz4=);
        `
    )
  }

  ${
    props => props.miss && css`
      background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzAgMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iIzU1NSI+PGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMSIvPjwvc3ZnPg==);
    `
  }

  ${
    props => props.enemy && props.move && !props.miss && !props.hit && !props.ship && css`
      :hover {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzAgMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iI2FhYSI+PGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMSIvPjwvc3ZnPg==);
      }
    `
  }
`;

export default (props) => <Cell
  enemy={ props.enemy }
  ship={ props.data && props.data.ship }
  sank={ props.data && props.data.sank }
  hit={ props.data && props.data.hit }
  miss={ props.data && props.data.miss }
  place={ props.place }
  times={ props.times }
  move={ props.move }
  className={ props.className }
  children={ props.children }
  onClick={
    () => {
      props.onClick &&
      (props.enemy === props.move) &&
      !props.data.hit &&
      !props.data.miss &&
      props.onClick(props.data.id);
    }
  }
/>
