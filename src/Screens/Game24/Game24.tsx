import React, {Component, useState, useReducer, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants';
import NumberTile from './NumberTile';
import ActionTile from './ActionTile';

const puzzles = require('./puzzles.json');

interface State {
  selected: number;
  action: 'add' | 'subtract' | 'multiply' | 'divide' | '';
  numbers: string[];
  currentProblem: string[];
  moveNumber: number;
  puzzleSolutions: any[];
  showSolutions: boolean;
  numberSolved: number;
}

interface NewState {
  selected?: number;
  action?: 'add' | 'subtract' | 'multiply' | 'divide' | '';
  numbers?: string[];
  currentProblem?: string[];
  moveNumber?: number;
  puzzleSolutions?: any[];
  showSolutions?: boolean;
  numberSolved?: number;
}

const Game24 = () => {
  const puzzlesList = puzzles.puzzles;
  const initialState: State = {
    selected: -1,
    action: '',
    numbers: null,
    currentProblem: null,
    moveNumber: 0,
    showSolutions: false,
    numberSolved: 0,
  };

  const [state, setState] = useReducer(
    (state: State, newState: NewState) => ({...state, ...newState}),
    initialState,
  );

  useEffect(() => {
    // setting initial state
    loadNextProblem();
  }, []);

  function getInitialNumbers() {
    let puzzle = puzzlesList[Math.floor(Math.random() * puzzlesList.length)];
    let {problem, solutions} = puzzle;
    let arr = problem.split(' ');
    return {problem: arr, solutions: solutions};
  }

  function onNumberPress(index: number) {
    const {numbers, selected, action, moveNumber, numberSolved} = state;

    console.log('pressed', numbers[index], selected, action);

    if (selected != -1 && action) {
      // we already have a number selected, this is the second number being selected so lets calculate

      console.log('gotta calculate');

      let firstNumber = Number(numbers[selected]);
      let secondNumber = Number(numbers[index]);

      console.log(
        'calculating ' + firstNumber + ' ' + action + ' ' + secondNumber,
      );

      let result = -1;

      switch (action) {
        case 'add':
          result = firstNumber + secondNumber;
          break;
        case 'subtract':
          result = firstNumber - secondNumber;
          break;
        case 'multiply':
          result = firstNumber * secondNumber;
          break;
        case 'divide':
          result = firstNumber / secondNumber;
          break;
      }

      console.log('result ', result);

      const nextMove = moveNumber + 1;
      console.log('move number', nextMove);

      if (nextMove === 3) {
        // that was the last move
        // check if we won
        if (result == 24) {
          // won
          Alert.alert('Congrats! You won.');
          // display new problem
          loadNextProblem(numberSolved + 1);
        } else {
          // lost
          Alert.alert('Sorry you lost.');
          // reset current problem
          onReset();
        }
      } else {
        // apply the calculation
        let copyNumbers = numbers.slice(0);
        copyNumbers[selected] = '';
        copyNumbers[index] = String(result);
        setState({
          numbers: copyNumbers,
          selected: index,
          action: '',
          moveNumber: nextMove,
        });
      }
    } else {
      // no action just set selected number
      setState({
        selected: index,
      });
    }
  }

  function onActionPress(action: 'add' | 'subtract' | 'multiply' | 'divide') {
    console.log('action pressed', action);
    if (state.selected == -1) {
      return;
    }
    setState({
      action: action,
    });
  }

  function onReset() {
    setState({
      ...initialState,
      numbers: state.currentProblem,
      puzzleSolutions: state.puzzleSolutions,
      currentProblem: state.currentProblem,
    });
  }

  function loadNextProblem(numberSolved: number = 0) {
    let {problem, solutions} = getInitialNumbers();
    setState({
      ...initialState,
      numbers: problem,
      currentProblem: problem,
      puzzleSolutions: solutions,
      numberSolved: numberSolved,
    });
  }

  const {
    numbers,
    action,
    selected,
    showSolutions,
    numberSolved,
    puzzleSolutions,
  } = state;

  if (!numbers) {
    return (
      <ActivityIndicator size="large" style={{flex: 1, alignSelf: 'center'}} />
    );
  }

  console.log('STATE', state);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.boxRow}>
          <NumberTile
            index={0}
            number={numbers[0]}
            selected={selected}
            onPress={() => onNumberPress(0)}
          />
          <NumberTile
            index={1}
            number={numbers[1]}
            selected={selected}
            onPress={() => onNumberPress(1)}
          />
        </View>
        <View style={styles.boxRow}>
          <NumberTile
            index={2}
            number={numbers[2]}
            selected={selected}
            onPress={() => onNumberPress(2)}
          />
          <NumberTile
            index={3}
            number={numbers[3]}
            selected={selected}
            onPress={() => onNumberPress(3)}
          />
        </View>
      </View>
      <View style={{flex: 1, marginTop: 5}}>
        <View style={styles.buttonsContainer}>
          <ActionTile
            onPress={() => onActionPress('add')}
            source={require('../../Images/add.png')}
            action="add"
            selected={action}
            disabled={selected == -1}
          />
          <ActionTile
            onPress={() => onActionPress('subtract')}
            source={require('../../Images/minus.png')}
            action="subtract"
            selected={action}
            disabled={selected == -1}
          />
          <ActionTile
            onPress={() => onActionPress('multiply')}
            source={require('../../Images/times.png')}
            action={'multiply'}
            selected={action}
            disabled={selected == -1}
          />
          <ActionTile
            onPress={() => onActionPress('divide')}
            source={require('../../Images/division.png')}
            action="divide"
            selected={action}
            disabled={selected == -1}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Solved: {numberSolved}</Text>
          <TouchableOpacity onPress={onReset} style={styles.resetButton}>
            <Text>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setState({showSolutions: !showSolutions})}
            style={styles.resetButton}>
            <Text>{showSolutions ? 'Hide Solutions' : 'Show Solutions'}</Text>
          </TouchableOpacity>
          {showSolutions &&
            puzzleSolutions.map((solution, index) => {
              return <Text key={index}>{solution}</Text>;
            })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxRow: {
    flex: 1,
    flexDirection: 'row',
  },
  resetButton: {
    height: '20%',
    width: '50%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    flex: 1,
    // height: SCREEN_HEIGHT * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

Game24.navigationOptions = {
  title: 'Game 24',
};

export default Game24;
