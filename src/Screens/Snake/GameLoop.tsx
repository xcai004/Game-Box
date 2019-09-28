import React from "react";
import Constants from "../../Constants";

interface Head {
  position: any;
  xspeed: number;
  yspeed: number;
  updateFrequency: number;
  nextMove: number;
  size: number;
  renderer: any;
}

const GameLoop = (entities: any, { touches, dispatch, events }: any) => {
  let head: Head = entities.head;
  //   head.position[0] += head.xspeed;
  head.nextMove -= 1;

  if (head.nextMove === 0) {
    head.nextMove = head.updateFrequency;

    if (
      head.position[0] + head.xspeed < 0 ||
      head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
      head.position[1] + head.yspeed < 0 ||
      head.position[1] + head.yspeed >= Constants.GRID_SIZE
    ) {
      // game over
    } else {
      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;
    }
  }
  return entities;
};

export default GameLoop;
