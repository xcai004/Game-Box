import React, {Component, useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Constants from '../../Constants';
import Head from './Head';
import GameLoop from './GameLoop';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Food from './Food';
import Tail from './Tail';
import {randomBetween} from '../../Constants/functions';

const GameSnake = () => {
  const [running, setRunning] = useState(true);

  const boardSize = Constants.CELL_SIZE * Constants.GRID_SIZE;
  const engine = useRef<GameEngine>(null);

  function move(type: string) {
    if (engine.current) {
      engine.current.dispatch({type: type});
    }
  }

  function onEvent(e: any) {
    if (e.type === 'game-over') {
      Alert.alert('Game Over');
      setRunning(false);
    }
  }

  function reset() {
    if (engine.current) {
      engine.current.swap(getInitialEntities());
      setRunning(true);
    }
  }

  function getInitialEntities() {
    return {
      head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        updateFrequency: 10,
        nextMove: 10,
        size: Constants.CELL_SIZE,
        renderer: <Head />,
      },
      food: {
        position: [
          randomBetween(0, Constants.GRID_SIZE - 1),
          randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Food />,
      },
      tail: {size: Constants.CELL_SIZE, elements: [], renderer: <Tail />},
    };
  }

  return (
    <View style={styles.container}>
      <GameEngine
        ref={engine}
        style={{
          width: boardSize,
          height: boardSize,
          flex: null,
          backgroundColor: '#fff',
        }}
        entities={getInitialEntities()}
        onEvent={onEvent}
        systems={[GameLoop]}
        running={running}
      />
      <TouchableOpacity
        style={{
          height: 50,
          width: 100,
          backgroundColor: running ? 'grey' : 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={running}
        onPress={() => reset()}>
        <Text>New Game</Text>
      </TouchableOpacity>
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => move('up')} style={styles.control} />
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => move('left')}
            style={styles.control}
          />
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.control, {backgroundColor: null}]}
          />
          <TouchableOpacity
            onPress={() => move('right')}
            style={styles.control}
          />
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => move('down')}
            style={styles.control}
          />
        </View>
      </View>
    </View>
  );
};

GameSnake.navigationOptions = {
  title: 'Game Sname',
};

export default GameSnake;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
  },
  controlRow: {
    width: 300,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});
