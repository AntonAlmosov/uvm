import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AppStyles } from "./app-styles";

interface NavHeaderProps {
  title: string;
  showSettings: boolean;
  showTitle: boolean;
}

export const NavHeader = ({
  title,
  showSettings,
  showTitle,
}: NavHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        zIndex: 1,
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
        {showTitle && title}
      </Text>
      {showSettings ? (
        <SettingsButton />
      ) : (
        <View style={{ width: 44, height: 44 }}></View>
      )}
    </View>
  );
};

const SettingsButton = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <View
      style={{
        width: 44,
        height: 44,
        position: "relative",
        marginRight: AppStyles.screenPadding,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          backgroundColor: "#fff",
        }}
        onPress={() => setShowModal(!showModal)}
      >
        <MaterialCommunityIcons
          name={"format-color-text"}
          size={24}
          color={"#000"}
          style={{ marginTop: 5 }}
        />
      </TouchableOpacity>
      {showModal && (
        <TouchableOpacity
          style={{
            zIndex: 998,
            position: "absolute",
            top: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            right: -AppStyles.screenPadding,
            backgroundColor: "#fff",
          }}
          onPress={() => setShowModal(false)}
        ></TouchableOpacity>
      )}
      {showModal && <SettingsModal />}
    </View>
  );
};

const SettingsModal = () => {
  const [activeColor, setActiveColor] = React.useState(0);
  return (
    <View
      style={{
        zIndex: 999,
        position: "absolute",
        top: 44,
        right: 0,
        width: AppStyles.screenWidth,
        backgroundColor: "#fff",
        ...AppStyles.shadows.general,
        borderRadius: 10,
        paddingTop: 16,
        paddingBottom: 18,
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginLeft: 14,
          marginRight: 14,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <MaterialCommunityIcons
          name={"format-color-text"}
          size={18}
          color={"#000"}
          style={{ marginTop: 5, marginRight: 15 }}
        />
        <Slider
          minimumValue={0}
          maximumValue={5}
          style={{ flex: 1 }}
          step={1}
          thumbStyle={{
            backgroundColor: "#fff",
            width: 26,
            height: 26,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.28,
            shadowRadius: 4,
          }}
        />
        <MaterialCommunityIcons
          name={"format-color-text"}
          size={24}
          color={"#000"}
          style={{ marginTop: 5, marginLeft: 15 }}
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 44,
          marginTop: 16,
          width: AppStyles.screenWidth - 28,
          marginLeft: 14,
          marginRight: 14,
        }}
      >
        <Text style={{ ...AppStyles.text.text }}>Шрифт</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...AppStyles.text.text, color: "#808080" }}>
            San Francisco
          </Text>
          <Feather
            name={"chevron-right"}
            size={20}
            color={"#b3b3b3"}
            style={{ marginLeft: 8, marginTop: 4.5 }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 16,
          width: 200,
          height: 44,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          containerStyle={{ overflow: "visible" }}
          style={{
            ...styles.colorButton,
            backgroundColor: "#fff",
            borderWidth: activeColor === 0 ? 2 : 0,
          }}
          onPress={() => setActiveColor(0)}
        ></TouchableOpacity>
        <TouchableOpacity
          containerStyle={{ overflow: "visible" }}
          style={{
            ...styles.colorButton,
            backgroundColor: "#ECECEC",
            borderWidth: activeColor === 1 ? 2 : 0,
          }}
          onPress={() => setActiveColor(1)}
        ></TouchableOpacity>
        <TouchableOpacity
          containerStyle={{ overflow: "visible" }}
          style={{
            ...styles.colorButton,
            backgroundColor: "#DCCEA2",
            borderWidth: activeColor === 2 ? 2 : 0,
          }}
          onPress={() => setActiveColor(2)}
        ></TouchableOpacity>
        <TouchableOpacity
          containerStyle={{ overflow: "visible" }}
          style={{
            ...styles.colorButton,
            backgroundColor: "#2E2D2A",
            borderWidth: activeColor === 3 ? 2 : 0,
          }}
          onPress={() => setActiveColor(3)}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: "#007AFF",
    ...AppStyles.shadows.general,
    shadowOpacity: 0.12,
  },
});
