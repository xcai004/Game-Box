import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "../../Constants/Styles";

interface ChooseGameButtonProps {
  image: any;
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const ChooseGameButton = ({
  image,
  text,
  onPress,
  disabled = false
}: ChooseGameButtonProps) => {
  return (
    <View style={Styles.SelectContainer}>
      <Image style={Styles.SelectGameImage} source={image} />

      <TouchableOpacity
        disabled={disabled}
        style={Styles.GameButton}
        onPress={() => onPress()}
      >
        <Text style={Styles.GameTitle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseGameButton;
