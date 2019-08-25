import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import Styles from "../../Constants/Styles";
import { TTT_LOGO } from "../../Constants/Images";
import { Select_BGP } from "../../Constants/Images";
import ChooseGameButton from "./ChooseGameButton";

// OLD WAY

// interface Props {}

// interface State {
//   counter: number;
// }

// export default class MainSelectGame extends Component<Props, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       counter: 0
//     };
//   }

//   addOne() {
//     this.setState({
//       counter: this.state.counter + 1
//     });
//   }

//   render() {
//     return (
//       <View>
//         <Text>COUNTER: {this.state.counter}</Text>
//         <Text>Hello World</Text>
//         <TouchableOpacity onPress={() => this.addOne()}>
//           <Text>ADD ONE</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
// const MainSelectGame = () => {
//   let [count, setCount] = useState(0);

//   return (
//     <View>
//       <Text>COUNTER: {count}</Text>
//       <Text>Hello World</Text>
//       <TouchableOpacity onPress={() => setCount(count + 1)}>
//         <Text>ADD ONE</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

interface Props {
  navigation: any;
}

export default class MainSelectGame extends Component<Props> {
  static navigationOptions = {
    title: "Select a Game"
    //header: null
  };

  render() {
    return (
      <ImageBackground
        source={Select_BGP}
        style={{ flex: 1 }}
        blurRadius={0.5}
        resizeMode={"cover"}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,

              flexDirection: "row"
            }}
          >
            <ChooseGameButton
              text="Tic Tac Toe"
              image={TTT_LOGO}
              onPress={() => this.props.navigation.navigate("TicTacToe")}
            />
            <ChooseGameButton
              text="Game 24"
              image={require("../../Images/24.png")}
              onPress={() => this.props.navigation.navigate("Game24")}
            />
          </View>
          <View
            style={{
              flex: 1,

              flexDirection: "row"
            }}
          >
            <ChooseGameButton
              text="Game Snake"
              image={require("../../Images/snake.png")}
              onPress={() => this.props.navigation.navigate("GameSnake")}
            />

            <ChooseGameButton
              text=". . ."
              image={require("../../Images/More.png")}
              onPress={() => {}}
              disabled={true}
            />
          </View>

          <View style={{ flex: 1 }}>{/* <Text>view 3</Text> */}</View>
        </View>
      </ImageBackground>
    );
  }
}

// MainSelectGame.navigationOptions = {
//   title: "Select a Game"
// };

//export default MainSelectGame;
