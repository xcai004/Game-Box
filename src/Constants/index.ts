import {Dimensions} from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  GRID_SIZE: Math.floor(SCREEN_HEIGHT * 0.018),
  CELL_SIZE: 25,
};
