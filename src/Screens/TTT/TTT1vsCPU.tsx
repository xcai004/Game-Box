import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Text
} from "react-native";
import Styles from "../../Constants/Styles";
import { TTT_BGP } from "../../Constants/Images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { tsConstructorType } from "@babel/types";
import { State } from "react-native-gesture-handler";

const winningCombos = [
  [1, 5, 9],
  [3, 5, 7],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
];

// export default class MainSelectGame extends Component<Props, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       counter: 0
//     };
//   }

interface Props {}

interface State {
  gameState: [number, number, number][];
  currentPlayer: number;
  openTiles: number;
}

export default class TTT1vsCPU extends Component<Props, State> {
  static navigationOptions = {
    title: "Tic Tac Toe"
    //header: null
  };
  constructor(props: any) {
    super(props);

    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      openTiles: 9
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      openTiles: 9
    });
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={Styles.X} />;
      case -1:
        return <Icon name="circle-outline" style={Styles.O} />;
      default:
        return <View />;
    }
  };

  playOpponentTile(arr) {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);

    while (arr[row][col] != 0) {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    }

    arr[row][col] = -1;

    this.setState(
      { gameState: arr, openTiles: this.state.openTiles - 1 },
      () => {
        var winner = this.getWinner();
        if (winner == 1) {
          Alert.alert("Player 1 is the winner!");
          this.initializeGame();
        } else if (winner == -1) {
          Alert.alert("Player 2 is the winner!");
          this.initializeGame();
        }
      }
    );
  }

  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();
    // set the correct tile
    arr[row][col] = currentPlayer;
    // set the next player
    // var nextPlayer = currentPlayer * -1;
    // set ai tile
    this.setState(
      { gameState: arr, openTiles: this.state.openTiles - 1 },
      () => {
        this.checkWinner();
      }
    );
  };

  checkWinner() {
    // check for winners

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner!");
      //this.initializeGame();
    } else if (winner == -1) {
      Alert.alert("Player 2 is the winner!");
      //this.initializeGame();
    } else {
      // no winner
      if (this.state.openTiles > 0) {
        // the game shall go on
        this.playOpponentTile(this.state.gameState);
      } else {
        // the game is over and its a drawe
        Alert.alert("It's a draw!");
      }
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  };

  getWinner = () => {
    var sum;
    var arr = this.state.gameState;

    for (var i = 0; i < 3; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    for (var i = 0; i < 3; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    return 0;
  };

  render() {
    console.log("THE GAME STATE", this.state.gameState.slice());
    return (
      <ImageBackground
        source={TTT_BGP}
        style={{ flex: 1 }}
        blurRadius={0.5}
        resizeMode={"cover"}
      >
        <View style={Styles.TTT_Container}>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={[Styles.Squre, { borderLeftWidth: 0, borderTopWidth: 0 }]}
            >
              {this.renderIcon(0, 0)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={[Styles.Squre, { borderTopWidth: 0 }]}
            >
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 2)}
              style={[Styles.Squre, { borderTopWidth: 0, borderRightWidth: 0 }]}
            >
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={[Styles.Squre, { borderLeftWidth: 0 }]}
            >
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={Styles.Squre}
            >
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={[Styles.Squre, { borderRightWidth: 0 }]}
            >
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={[
                Styles.Squre,
                { borderLeftWidth: 0 },
                { borderBottomWidth: 0 }
              ]}
            >
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={[Styles.Squre, { borderBottomWidth: 0 }]}
            >
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={[
                Styles.Squre,
                { borderBottomWidth: 0 },
                { borderRightWidth: 0 }
              ]}
            >
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              height: "8%",
              width: "35%",
              backgroundColor: "#966F33",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "#FDD017",
              borderWidth: 4,
              marginTop: 50
            }}
            onPress={this.onNewGamePress}
          >
            <Text style={Styles.GameTitle}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
