import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface NumberTileProps {
  index: number;
  selected: number;
  number: string;
  onPress: any;
}

const NumberTile = ({number, onPress, selected, index}: NumberTileProps) => {
  let isSelected = index == selected;
  if (number == '') {
    return null;
  }
  return (
    <TouchableOpacity
      disabled={isSelected}
      style={[styles.box, {borderWidth: isSelected ? 5 : 2}]}
      onPress={onPress}>
      <Text style={styles.number}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
  },
  number: {
    fontSize: 35,
  },
});

export default NumberTile;
