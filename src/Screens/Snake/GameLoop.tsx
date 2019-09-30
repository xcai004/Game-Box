import React from 'react';
import Constants from '../../Constants';
import {randomBetween} from '../../Constants/functions';

interface Head {
  position: any;
  xspeed: number;
  yspeed: number;
  updateFrequency: number;
  nextMove: number;
  size: number;
  renderer: any;
}

const GameLoop = (entities: any, {touches, dispatch, events}: any) => {
  let head: Head = entities.head;
  let food = entities.food;
  let tail = entities.tail;

  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type == 'up' && head.yspeed !== 1) {
        head.yspeed = -1;
        head.xspeed = 0;
      } else if (events[i].type == 'down' && head.yspeed !== -1) {
        head.yspeed = 1;
        head.xspeed = 0;
      } else if (events[i].type == 'left' && head.xspeed !== 1) {
        head.xspeed = -1;
        head.yspeed = 0;
      } else if (events[i].type == 'right' && head.xspeed !== -1) {
        head.xspeed = 1;
        head.yspeed = 0;
      }
    }
  }

  head.nextMove -= 1;

  if (head.nextMove === 0) {
    head.nextMove = head.updateFrequency;

    if (
      head.position[0] + head.xspeed < 0 ||
      head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
      head.position[1] + head.yspeed < 0 ||
      head.position[1] + head.yspeed >= Constants.GRID_SIZE
    ) {
      console.log('we hit a wall');
      // game over
      dispatch({
        type: 'game-over',
      });
    } else {
      // MAKE TAIL FOLLOW HEAD
      tail.elements = [[head.position[0], head.position[1]]]
        .concat(tail.elements)
        .slice(0, -1);

      // MOVE HEAD
      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;

      // CHECK IF WE HIT OUR OWN TAIL
      for (let i = 0; i < tail.elements.length; i++) {
        if (
          head.position[0] === tail.elements[i][0] &&
          head.position[1] === tail.elements[i][1]
        ) {
          // TELL GAME IS OVER
          console.log('we hit our own tail');
          dispatch({
            type: 'game-over',
          });
        }
      }

      // CHECK IF WE ATE SOME FOOD
      if (
        head.position[0] === food.position[0] &&
        head.position[1] === food.position[1]
      ) {
        // GROW THE TAIL
        tail.elements = [[food.position[0], food.position[1]]].concat(
          tail.elements,
        );
        // GENERATE NEW FOOD POSITION
        food.position[0] = randomBetween(0, Constants.GRID_SIZE - 1);
        food.position[1] = randomBetween(0, Constants.GRID_SIZE - 1);
        dispatch({
          type: 'food',
        });
      }
    }
  }
  return entities;
};

export default GameLoop;
