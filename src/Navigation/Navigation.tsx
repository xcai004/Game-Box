import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "../Screens/Home/Main";
import MainSelectGame from "../Screens/GameSelect/MainSelectGame";
import GameTTT from "../Screens/TTT/GameTTT";
import TTT1vs1 from "../Screens/TTT/TTT1vs1";
import TTT1vsCPU from "../Screens/TTT/TTT1vsCPU";
import Game24 from "../Screens/Game24/Game24";
import GameSnake from "../Screens/Snake/GameSnake";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Main
    },
    SelectGame: {
      screen: MainSelectGame
    },
    TicTacToe: {
      screen: GameTTT
    },
    Screen1vs1: {
      screen: TTT1vs1
    },
    Screen1vsCPU: {
      screen: TTT1vsCPU
    },
    Game24: {
      screen: Game24
    },
    GameSnake: {
      screen: GameSnake
    }
  },
  {
    initialRouteName: "Home"
    // headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
