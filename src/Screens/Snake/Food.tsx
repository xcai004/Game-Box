import React from 'react';
import {View} from 'react-native';

const Food = (props: any) => {
  const x = props.position[0];
  const y = props.position[1];

  return (
    <View
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: 'green',
        position: 'absolute',
        left: x * props.size,
        top: y * props.size,
      }}
    />
  );
};

export default Food;
