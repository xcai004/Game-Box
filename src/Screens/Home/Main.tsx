import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Button,
  StyleSheet
} from "react-native";
import Styles from "../../Constants/Styles";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { MAIN_BG } from "../../Constants/Images";

interface Props {
  navigation: any;
}

export default class Main extends Component<Props> {
  static navigationOptions = {
    //  title: 'Home',
    header: null
  };

  render() {
    return (
      <ImageBackground
        source={MAIN_BG}
        style={{ flex: 1 }}
        blurRadius={0.5}
        resizeMode={"cover"}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={Styles.MianTitle}>GameBox</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: "10%"
            }}
          >
            <TouchableOpacity
              style={{
                height: "20%",
                width: "60%",
                backgroundColor: "#966F33",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                borderColor: "#FDD017",
                borderWidth: 4
              }}
              onPress={() => this.props.navigation.navigate("SelectGame")}
            >
              <Text style={Styles.SelectText}>Select Your Game</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
// const AppNavigator = createStackNavigator({
//     Home: {
//       screen: Main
//     }
//   });
