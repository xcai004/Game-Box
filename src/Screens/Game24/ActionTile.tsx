import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {SCREEN_WIDTH} from '../../Constants';
import Colors from '../../Constants/Colors';
import {Icon} from 'native-base';

interface ActionTileProps {
  icon: {
    name: string;
    type:
      | 'AntDesign'
      | 'Entypo'
      | 'EvilIcons'
      | 'Feather'
      | 'FontAwesome'
      | 'FontAwesome5'
      | 'Foundation'
      | 'Ionicons'
      | 'MaterialCommunityIcons'
      | 'MaterialIcons'
      | 'Octicons'
      | 'SimpleLineIcons'
      | 'Zocial'
      | undefined;
  };
  onPress: any;
  action: 'add' | 'subtract' | 'multiply' | 'divide';
  selected: string;
  disabled: boolean;
}

const ActionTile = ({
  icon,
  onPress,
  action,
  selected,
  disabled,
}: ActionTileProps) => {
  let isSelected = action == selected;
  let {name, type} = icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonContainer, {borderWidth: isSelected ? 5 : 2}]}>
      <Icon
        name={name}
        type={type}
        style={[
          styles.icon,
          {color: isSelected ? '#ee7621' : Colors.primary_color},
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: '65%',
    width: '20%',
    backgroundColor: Colors.secondary_color + '65',
    borderRadius: 16,
    borderColor: Colors.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 28,
    // // flex: 1,
    // // marginHorizontal: 5,
    // height: '100%',
    // width: '100%',
  },
});

export default ActionTile;
