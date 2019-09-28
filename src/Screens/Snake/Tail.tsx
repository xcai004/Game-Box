import React from 'react';
import {View} from 'react-native';
import Constants from '../../Constants';

const Tail = (props: any) => {
  let tailList = props.elements.map((element, index) => {
    return (
      <View
        key={index}
        style={{
          width: props.size,
          height: props.size,
          backgroundColor: 'grey',
          position: 'absolute',
          left: element[0] * props.size,
          top: element[1] * props.size,
        }}
      />
    );
  });

  return (
    <View
      style={{
        width: Constants.GRID_SIZE * props.size,
        height: Constants.GRID_SIZE * props.size,
      }}>
      {tailList}
    </View>
  );
};

export default Tail;
