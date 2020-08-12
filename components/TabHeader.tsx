import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppStyles } from "./app-styles";

interface TabHeaderProps {
  label: string;
  showPoints?: boolean;
}

export const TabHeader = ({ label, showPoints }: TabHeaderProps) => {
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
            10Б
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
