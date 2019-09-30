import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';
import {SCREEN_HEIGHT} from '../../Constants';

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
      style={[styles.box, {borderWidth: isSelected ? 7 : 2.5}]}
      onPress={onPress}>
      <Text
        style={[
          styles.number,
          {color: isSelected ? '#ee7621' : Colors.primary_color},
        ]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary_color,
    backgroundColor: Colors.secondary_color + '75',
    borderRadius: 18,
  },
  number: {
    fontSize: SCREEN_HEIGHT * 0.08,
    color: Colors.primary_color,
    fontFamily: 'Chalkboard SE',
  },
});

export default NumberTile;
