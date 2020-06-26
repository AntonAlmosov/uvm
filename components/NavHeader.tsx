import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AppStyles } from "./app-styles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface NavHeaderProps {
  title: string;
  showSettings: boolean;
}

export const NavHeader = ({ title, showSettings }: NavHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        height: 44,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          marginLeft: AppStyles.screenPadding,
          backgroundColor: "#fff",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather
          name={"chevron-left"}
          size={24}
          color={"#000"}
          style={{ marginTop: 3 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          ...AppStyles.text.heading4,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {showSettings ? (
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            marginRight: AppStyles.screenPadding,
            backgroundColor: "#fff",
          }}
        >
          <MaterialCommunityIcons
            name={"format-color-text"}
            size={24}
            color={"#000"}
            style={{ marginTop: 5 }}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 44, height: 44 }}></View>
      )}
    </View>
  );
};
