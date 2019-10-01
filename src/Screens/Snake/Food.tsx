import React from 'react';
import {View, Image} from 'react-native';
import {APPLE_IMG} from '../../Constants/Images';

const Food = (props: any) => {
  const x = props.position[0];
  const y = props.position[1];

  return (
    <Image
      source={APPLE_IMG}
      style={{
        width: props.size,
        height: props.size,
        // backgroundColor: 'green',
        position: 'absolute',
        left: x * props.size,
        top: y * props.size,
      }}
    />
  );
};

export default Food;
