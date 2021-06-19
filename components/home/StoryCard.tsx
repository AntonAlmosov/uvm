import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Emoji from "react-native-emoji";

import { AppStyles } from "../app-styles";
import { useChapterQuery } from "../../model/api";

interface StoryCardProps {
  id: number;
  onPress: () => void;
  disabled?: boolean;
}

export const StoryCard = ({ id, onPress, disabled }: StoryCardProps) => {
  const { data } = useChapterQuery({ variables: { id: String(id + 1) } });
  console.log(data);
  if (data === undefined || data.chapter === null) {
    return (
      <View
        style={{
          overflow: "visible",
          width: AppStyles.screenWidth,
          marginLeft: AppStyles.screenPadding,
          height: 212,
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: "#fff",
          ...AppStyles.shadows.general,
          borderRadius: 20,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"small"} color={"#000"} />
      </View>
    );
  }
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
      disabled={disabled}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ ...AppStyles.text.heading2, width: "60%" }}>
          {"День " + (id + 1)}
        </Text>
        <Emoji
          name={data.chapter?.emoji || ""}
          style={{
            ...AppStyles.text.heading2,
            textAlign: "right",
            width: "15%",
            color: "#ffffff",
          }}
        />
      </View>
      <Text style={{ ...AppStyles.text.text, marginTop: 15 }}>
        {data.chapter?.description}
      </Text>
    </TouchableOpacity>
  );
};
