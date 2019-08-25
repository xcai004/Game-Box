import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Home Page
  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 500,
    height: 500
  },
  MianTitle: {
    textAlign: "center",
    lineHeight: 350,
    //  textShadowOffset: { width: 5, height: 5 },
    shadowOffset: { height: 5, width: 2 },
    shadowRadius: 3,
    shadowColor: "black",
    shadowOpacity: 0.4,
    //zIndex: 5,
    fontSize: 52,
    color: "#15317E",
    fontFamily: "Chalkboard SE"
  },

  // Select Game Page

  SelectText: {
    fontSize: 24,
    fontFamily: "Chalkboard SE",
    color: "#FDD017"
  },
  SelectGameImage: {
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "#FDD017",
    borderWidth: 8
  },
  SelectContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  GameTitle: {
    fontSize: 16,
    fontFamily: "Chalkboard SE",
    color: "#FDD017"
  },
  GameButton: {
    height: "15%",
    width: "85%",
    backgroundColor: "#966F33",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#FDD017",
    borderWidth: 4,
    marginTop: 10
  },

  // Tic Tac Toe Page
  TTT_Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  Squre: {
    borderWidth: 2,
    width: 120,
    height: 120
  },

  X: {
    color: "green",
    fontSize: 110
  },
  O: {
    color: "#FDD017",
    fontSize: 110
  }
});
