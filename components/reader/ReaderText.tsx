import React from "react";
import { View, Text } from "react-native";
import { AppStyles } from "../app-styles";

interface ReaderTextProps {
  text: string;
}

export const ReaderText = ({ text }: ReaderTextProps) => {
  return (
    <View
      style={{
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
        marginTop: 60,
      }}
    >
      <Text style={{ ...AppStyles.text.text }}>{text}</Text>
    </View>
  );
};
