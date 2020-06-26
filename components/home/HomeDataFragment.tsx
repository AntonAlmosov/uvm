import React from "react";
import { View, Text } from "react-native";
import { AppStyles } from "../app-styles";

interface HomeDataFragmentProps {
  data: string;
  label: string;
}

export const HomeDataFragment = ({ data, label }: HomeDataFragmentProps) => {
  return (
    <View
      style={{
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
        marginBottom: 24,
      }}
    >
      <Text style={{ ...AppStyles.text.giantLabel, textAlign: "center" }}>
        {data}
      </Text>
      <Text style={{ ...AppStyles.text.text, textAlign: "center" }}>
        {label}
      </Text>
    </View>
  );
};
