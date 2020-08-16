import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppStyles } from "./app-styles";
import { useModel } from "../model/model";

interface TabHeaderProps {
  label: string;
  showPoints?: boolean;
}

export const TabHeader = ({ label, showPoints }: TabHeaderProps) => {
  const points = useModel().readerState.points;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 86,
        paddingTop: 28,
        backgroundColor: "#fff",
        zIndex: 1,
      }}
    >
      <Text
        style={{
          ...AppStyles.text.heading1,
          marginLeft: AppStyles.screenPadding,
        }}
      >
        {label}
      </Text>
      {showPoints && (
        <TouchableOpacity
          style={{
            marginRight: AppStyles.screenPadding,
            width: 44,
            height: 44,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ ...AppStyles.text.quoteCaption, textAlign: "center" }}>
            {points + " Б"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
