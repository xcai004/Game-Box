import React, { Component, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Constants from "../../Constants";
import Head from "./Head";
import GameLoop from "./GameLoop";
import { TouchableOpacity } from "react-native-gesture-handler";

const GameSnake = () => {
  const boardSize = Constants.CELL_SIZE * Constants.GRID_SIZE;
  const engine = useRef<GameEngine>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <GameEngine
        ref={engine}
        style={{
          width: boardSize,
          height: boardSize,
          flex: null,
          backgroundColor: "#fff"
        }}
        entities={{
          head: {
            position: [0, 0],
            xspeed: 1,
            yspeed: 0,
            updateFrequency: 10,
            nextMove: 10,
            size: Constants.CELL_SIZE,
            renderer: <Head />
          }
        }}
        systems={[GameLoop]}
      />
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => {}} style={styles.control} />
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => {}} style={styles.control} />
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.control, { backgroundColor: null }]}
          />
          <TouchableOpacity onPress={() => {}} style={styles.control} />
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => {}} style={styles.control} />
        </View>
      </View>
    </View>
  );
};

GameSnake.navigationOptions = {
  title: "Game Sname"
};

export default GameSnake;

const styles = StyleSheet.create({
  controls: {
    width: 300,
    height: 300,
    flexDirection: "column"
  },
  controlRow: {
    width: 300,
    height: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: "blue"
  }
});
