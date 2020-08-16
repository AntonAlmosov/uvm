import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Emoji from "react-native-emoji";

import { AppStyles } from "../app-styles";

interface StoryCardProps {
  title: string;
  emoji: string;
  text: string;
  onPress: () => void;
}

export const StoryCard = ({ title, emoji, text, onPress }: StoryCardProps) => {
  return (
    <TouchableOpacity
      containerStyle={{ overflow: "visible" }}
      style={{
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#fff",
        ...AppStyles.shadows.general,
        borderRadius: 20,
        marginBottom: 16,
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ ...AppStyles.text.heading2, width: "60%" }}>
          {title}
        </Text>
        {/* <Emoji
          name={emoji}
          style={{
            ...AppStyles.text.heading2,
            textAlign: "right",
            width: "15%",
          }}
        /> */}
      </View>
      <Text style={{ ...AppStyles.text.text, marginTop: 15 }}>{text}</Text>
    </TouchableOpacity>
  );
};
