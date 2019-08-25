import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { TTT_BGP } from "../../Constants/Images";
import Styles from "../../Constants/Styles";
import { SCREEN_HEIGHT } from "../../Constants";

interface Props {
  navigation: any;
}

export default class GameTTT extends Component<Props> {
  render() {
    return (
      <ImageBackground
        source={TTT_BGP}
        style={{ flex: 1 }}
        blurRadius={0.5}
        resizeMode={"cover"}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={Styles.MianTitle}>Select Mode</Text>
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
                borderWidth: 4,
                marginBottom: 20
              }}
              onPress={() => this.props.navigation.navigate("Screen1vs1")}
            >
              <Text style={Styles.SelectText}>1vs1</Text>
            </TouchableOpacity>

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
              onPress={() => this.props.navigation.navigate("Screen1vsCPU")}
            >
              <Text style={Styles.SelectText}>1vsCPU</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
