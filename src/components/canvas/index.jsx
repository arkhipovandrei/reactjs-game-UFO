import React from 'react';
import PropTypes from 'prop-types';
import {gameHeight} from '../../utils/constants'
import Sky from './Sky';
import Ground from './Ground';
import CurrentScore from './CurrentScore';
import Base from '../cannon/Base';
import Pipe from '../cannon/Pipe';
import Ball from '../cannon/Ball';
import FlyingObject from '../alien/FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';

const Canvas = (props) => {

  const windowWidth = window.innerWidth;

  const viewBox = [windowWidth / -2, 100 - gameHeight, windowWidth, gameHeight];

  const lives = [];
  for (let i = 0; i < props.gameState.lives; i++) {
    const heartPosition = {
      x: -180 - (i * 70),
      y: 35
    };
    lives.push(<Heart key={i} position={heartPosition}/>);
  }


  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
      onMouseMove={props.trackMouse}
      onClick={props.shoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2"/>
        </filter>
      </defs>

      <Sky/>
      <Ground/>
      <Base/>
      {props.gameState.cannonBalls.map(cannonBall => (
        <Ball
          key={cannonBall.id}
          position={cannonBall.position}
        />
      ))}
      <Pipe rotation={props.angle}/>
      <CurrentScore score={props.gameState.kills} />

      {!props.gameState.started &&
      <g>
        <StartGame onClick={() => props.startGame()}/>
        <Title/>
      </g>
      }

      {props.gameState.flyingObjects.map(flyingObject => (
        <FlyingObject
          key={flyingObject.id}
          position={flyingObject.position}
        />
      ))}
      {lives}
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(PropTypes.shape({
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  trackMouse: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
};

export default Canvas;