import React from 'react';
import {View} from 'react-native';
import Constants from '../../Constants';
import Colors from '../../Constants/Colors';

const Tail = (props: any) => {
  let tailList = props.elements.map((element, index) => {
    return (
      <View
        key={index}
        style={{
          width: props.size,
          height: props.size,
          backgroundColor: Colors.secondary_color,
          borderWidth: 0.7,
          borderColor: Colors.primary_color,
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
