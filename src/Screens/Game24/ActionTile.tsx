import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {SCREEN_WIDTH} from '../../Constants';

interface ActionTileProps {
  source: any;
  onPress: any;
  action: 'add' | 'subtract' | 'multiply' | 'divide';
  selected: string;
  disabled: boolean;
}

const ActionTile = ({
  source,
  onPress,
  action,
  selected,
  disabled,
}: ActionTileProps) => {
  let isSelected = action == selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      //   style={{}
    >
      <Image
        source={source}
        style={[styles.button, {borderWidth: isSelected ? 5 : 2}]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    // marginHorizontal: 5,
    borderColor: 'green',
    height: SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.2,
    // backgroundColor: 'blue',
  },
});

export default ActionTile;
