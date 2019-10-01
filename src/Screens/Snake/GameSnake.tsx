import React, {Component, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Vibration,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Constants, {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants';
import Head from './Head';
import GameLoop from './GameLoop';
import Food from './Food';
import Tail from './Tail';
import {randomBetween} from '../../Constants/functions';
import Controls from './Controls';
import Colors from '../../Constants/Colors';
import SnakeHeader from './SnakeHeader';
import {SNAKE_GAME_BG} from '../../Constants/Images';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const GameSnake = () => {
  const [running, setRunning] = useState(true);
  const [foodScore, setFoodScore] = useState(0);
  const boardSize = Constants.CELL_SIZE * Constants.GRID_SIZE;
  const engine = useRef<GameEngine>(null);

  function move(type: string) {
    ReactNativeHapticFeedback.trigger('impactLight', options);
    if (engine.current) {
      engine.current.dispatch({type: type});
    }
  }

  function onEvent(e: any) {
    if (e.type === 'game-over') {
      Alert.alert('Game Over');
      setRunning(false);
    }

    if (e.type === 'food') {
      setFoodScore(foodScore + 1);
    }
  }

  function reset() {
    if (engine.current) {
      engine.current.swap(getInitialEntities());
      setRunning(true);
      setFoodScore(0);
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

  function onSwipeUp(gestureState) {
    // this.setState({ myText: 'You swiped up!' });
    move('up');
  }

  function onSwipeDown(gestureState) {
    // this.setState({ myText: 'You swiped down!' });
    move('down');
  }

  function onSwipeLeft(gestureState) {
    // this.setState({ myText: 'You swiped left!' });
    move('left');
  }

  function onSwipeRight(gestureState) {
    // this.setState({ myText: 'You swiped right!' });
    move('right');
  }

  // function onSwipe(gestureName, gestureState) {
  //   const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
  //   this.setState({ gestureName: gestureName });
  //   switch (gestureName) {
  //     case SWIPE_UP:
  //       this.setState({ backgroundColor: 'red' });
  //       break;
  //     case SWIPE_DOWN:
  //       this.setState({ backgroundColor: 'green' });
  //       break;
  //     case SWIPE_LEFT:
  //       this.setState({ backgroundColor: 'blue' });
  //       break;
  //     case SWIPE_RIGHT:
  //       this.setState({ backgroundColor: 'yellow' });
  //       break;
  //   }
  // }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <ImageBackground
      source={SNAKE_GAME_BG}
      blurRadius={1.2}
      style={styles.container}>
      <SnakeHeader foodScore={foodScore} />
      <GestureRecognizer
        // onSwipe={onSwipe}
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={
          {
            // flex: 1,
            // backgroundColor: this.state.backgroundColor
          }
        }>
        <GameEngine
          ref={engine}
          style={[
            styles.game,
            {
              width: boardSize,
              height: boardSize,
            },
          ]}
          entities={getInitialEntities()}
          onEvent={onEvent}
          systems={[GameLoop]}
          running={running}
        />
      </GestureRecognizer>
      <View style={styles.centerRow}>
        <View style={styles.centerCol}>
          <Controls move={move} />
        </View>
        <View style={styles.centerCol}>
          <TouchableOpacity
            style={[
              styles.resetButton,
              {
                backgroundColor: running ? 'grey' : Colors.primary_color,
                borderColor: running ? 'white' : Colors.secondary_color,
              },
            ]}
            disabled={running}
            onPress={() => reset()}>
            <Text
              style={[
                styles.resetText,
                {color: running ? 'white' : Colors.secondary_color},
              ]}>
              New Game
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

GameSnake.navigationOptions = {
  title: 'Game Sname',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
  },

  resetButton: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.secondary_color,
  },
  resetText: {
    color: Colors.secondary_color,
    fontFamily: 'Chalkboard SE',
  },
  centerCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerRow: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
  },
  game: {
    flex: null,
    backgroundColor: Colors.primary_color + '75',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default GameSnake;
