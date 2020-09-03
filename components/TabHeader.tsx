import React from "react";
import { Text, View } from "react-native";
import { AppStyles } from "./app-styles";
import { useModel } from "../model/model";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../navigation/routes";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TabHeaderProps {
  label: string;
  showPoints?: boolean;
}

export const TabHeader = ({ label, showPoints }: TabHeaderProps) => {
  const points = useModel().readerState.points;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 86,
        paddingTop: 28,
        paddingBottom: 10,
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
          containerStyle={{ overflow: "visible" }}
          style={{
            marginRight: AppStyles.screenPadding,
            width: 44,
            height: 44,
            borderRadius: 9,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
          onPress={() => navigation.navigate(Routes.Points)}
        >
          <Text
            style={{
              ...AppStyles.text.quoteCaption,
              textAlign: "center",
            }}
          >
            {points + " Б"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
