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
  ImageBackground,
  Button,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants';
import NumberTile from './NumberTile';
import ActionTile from './ActionTile';
import Colors from '../../Constants/Colors';
import Modal from 'react-native-modal';
import {GAME_24_BG} from '../../Constants/Images';

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
      numberSolved: state.numberSolved,
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
      <ImageBackground source={GAME_24_BG} style={{flex: 1}}>
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
              icon={{name: 'plus', type: 'FontAwesome5'}}
              action="add"
              selected={action}
              disabled={selected == -1}
            />
            <ActionTile
              onPress={() => onActionPress('subtract')}
              icon={{name: 'minus', type: 'FontAwesome5'}}
              action="subtract"
              selected={action}
              disabled={selected == -1}
            />
            <ActionTile
              onPress={() => onActionPress('multiply')}
              icon={{name: 'times', type: 'FontAwesome5'}}
              action={'multiply'}
              selected={action}
              disabled={selected == -1}
            />
            <ActionTile
              onPress={() => onActionPress('divide')}
              icon={{name: 'divide', type: 'FontAwesome5'}}
              action="divide"
              selected={action}
              disabled={selected == -1}
            />
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.score}>
              <Text style={styles.solvedText}>Solved: {numberSolved}</Text>
            </View>

            <TouchableOpacity onPress={onReset} style={styles.resetButton}>
              <Text style={styles.text}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setState({showSolutions: !showSolutions})}
              style={styles.showSolutionsButton}>
              <Text style={styles.text}>
                {showSolutions ? 'Hide Solutions' : 'Show Solutions'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Modal
        isVisible={showSolutions}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropTransitionOutTiming={0}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          {puzzleSolutions.map((solution, index) => {
            return (
              <Text key={index} style={styles.solutionText}>
                {solution}
              </Text>
            );
          })}
          <Button
            onPress={() => setState({showSolutions: !showSolutions})}
            title="Close"
          />
        </View>
      </Modal>
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
    width: '85%',
    backgroundColor: Colors.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: Colors.secondary_color,
    borderWidth: 4,
    marginTop: 10,
  },
  score: {
    height: '20%',
    width: '85%',
    backgroundColor: Colors.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: Colors.secondary_color,
    borderWidth: 4,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Chalkboard SE',
    color: Colors.secondary_color,
  },
  solutionText: {
    fontSize: 20,
    // fontFamily: 'Chalkboard SE',
    color: Colors.primary_color,
  },
  solvedText: {
    fontSize: 20,
    fontFamily: 'Chalkboard SE',
    color: Colors.secondary_color,
  },
  showSolutionsButton: {
    height: '20%',
    width: '85%',
    backgroundColor: Colors.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: Colors.secondary_color,
    borderWidth: 4,
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
