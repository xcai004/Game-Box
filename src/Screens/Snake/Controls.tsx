import React, {Component, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants, {SCREEN_HEIGHT} from '../../Constants';
import {UP_IMG, LEFT_IMG, RIGHT_IMG, DOWN_IMG} from '../../Constants/Images';

interface ControlsProps {
  move: any;
}

const Controls = ({move}: ControlsProps) => {
  return (
    <View style={styles.controls}>
      <View style={styles.controlRow}>
        <TouchableOpacity onPress={() => move('up')}>
          <Image source={UP_IMG} style={styles.control} />
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity onPress={() => move('left')}>
          <Image source={LEFT_IMG} style={styles.control} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          disabled
          style={styles.centerSpace}
        />
        <TouchableOpacity onPress={() => move('right')}>
          <Image source={RIGHT_IMG} style={styles.control} />
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity onPress={() => move('down')}>
          <Image source={DOWN_IMG} style={styles.control} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Controls;

const controlSize = SCREEN_HEIGHT * 0.07;
const centerSpace = controlSize * 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  centerSpace: {
    width: centerSpace,
    height: centerSpace,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    width: controlSize,
    height: controlSize,
    margin: -10,
    // backgroundColor: 'blue',
  },
});
