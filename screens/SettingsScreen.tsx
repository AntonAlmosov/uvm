import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabHeader } from "../components/TabHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStyles, Fonts } from "../components/app-styles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useModel } from "../model/model";
import { BackgroundColor, Settings } from "../model/settings-state";
import { Slider } from "react-native-elements";
import {
  getFontSizeIndex,
  getFontFamilyName,
  getFontSizeType,
} from "../components/utils";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SettingsScreen = () => {
  const settingsState = useModel().settingsState;
  const [showFontsModal, setShowFontsModal] = React.useState<boolean>(false);

  const handleSliderChange = (value: number) => {
    settingsState.setSetting(Settings.FontSize, getFontSizeType(value));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader label={"Настройки"} showPoints />
      {showFontsModal && (
        <View
          style={{
            zIndex: 2,
            position: "absolute",
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            onPress={() => setShowFontsModal(false)}
          ></TouchableOpacity>
        </View>
      )}
      <View
        style={{
          width: AppStyles.screenWidth,
          marginLeft: AppStyles.screenPadding,
          marginTop: 40,
          zIndex: 9999,
        }}
      >
        {showFontsModal && <FontsModal />}
        <View
          style={{
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
            maximumValue={4}
            value={getFontSizeIndex(settingsState.fontSize)}
            onValueChange={handleSliderChange}
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
          containerStyle={{ overflow: "visible" }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 44,
            marginTop: 20,
            position: "relative",
            zIndex: 9999,
          }}
          onPress={() => setShowFontsModal(!showFontsModal)}
        >
          <Text style={{ ...AppStyles.text.text, color: "#000" }}>Шрифт</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                ...AppStyles.text.text,
                color: "#000",
                opacity: 0.5,
              }}
            >
              {getFontFamilyName(settingsState.fontFamily)}
            </Text>
            <Feather
              name={"chevron-right"}
              size={20}
              color={"#000"}
              style={{ marginLeft: 8, marginTop: 4.5, opacity: 0.6 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: AppStyles.screenWidth,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 14,
          }}
        >
          <Text style={{ ...AppStyles.text.text }}>Фон</Text>
          <View
            style={{
              marginTop: 16,
              width: 200,
              height: 44,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BackgroundSettingButton
              onPress={(backgroundColor) =>
                settingsState.setSetting(
                  Settings.BackgroundColor,
                  backgroundColor
                )
              }
              backgroundColor={BackgroundColor.White}
              isSelected={
                settingsState.backgroundColor === BackgroundColor.White
              }
            />
            <BackgroundSettingButton
              onPress={(backgroundColor) =>
                settingsState.setSetting(
                  Settings.BackgroundColor,
                  backgroundColor
                )
              }
              backgroundColor={BackgroundColor.Grey}
              isSelected={
                settingsState.backgroundColor === BackgroundColor.Grey
              }
            />
            <BackgroundSettingButton
              onPress={(backgroundColor) =>
                settingsState.setSetting(
                  Settings.BackgroundColor,
                  backgroundColor
                )
              }
              backgroundColor={BackgroundColor.Beige}
              isSelected={
                settingsState.backgroundColor === BackgroundColor.Beige
              }
            />
            <BackgroundSettingButton
              onPress={(backgroundColor) =>
                settingsState.setSetting(
                  Settings.BackgroundColor,
                  backgroundColor
                )
              }
              backgroundColor={BackgroundColor.Dark}
              isSelected={
                settingsState.backgroundColor === BackgroundColor.Dark
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const FontsModal = () => {
  return (
    <View
      style={{
        zIndex: 9999,
        position: "absolute",
        top: 110,
        width: AppStyles.screenWidth,
        backgroundColor: "#fff",
        ...AppStyles.shadows.general,
        borderRadius: 10,
        paddingBottom: 8,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: AppStyles.screenWidth - 28,
          marginLeft: 14,
          marginRight: 14,
          marginTop: 14,
          marginBottom: 22,
          height: 44,
        }}
      >
        <Text
          style={{
            ...AppStyles.text.smallLabel,
            color: "#000",
            textAlign: "center",
          }}
        >
          Выбор шрифта
        </Text>
      </View>
      <FontSelecionButton fontName={Fonts.SFProRegular} />
      <FontSelecionButton fontName={Fonts.InterRegular} />
      <FontSelecionButton fontName={Fonts.NewYorkRegular} />
      <FontSelecionButton fontName={Fonts.LoraRegular} />
      <FontSelecionButton fontName={Fonts.SpectralRegular} />
    </View>
  );
};

interface FontSelecionButtonProps {
  fontName: Fonts;
}

const FontSelecionButton = ({ fontName }: FontSelecionButtonProps) => {
  const settingsState = useModel().settingsState;
  const isBgDark = settingsState.backgroundColor === BackgroundColor.Dark;
  const fontColor = isBgDark ? "#E2D4D4" : "#000000";
  return (
    <TouchableOpacity
      style={{
        justifyContent: "space-between",
        width: AppStyles.screenWidth - 52,
        flexDirection: "row",
        marginBottom: 18,
      }}
      onPress={() => settingsState.setSetting(Settings.FontFamily, fontName)}
    >
      <Text
        style={{
          ...AppStyles.text.text,
          fontFamily: fontName,
          color: fontColor,
        }}
      >
        {getFontFamilyName(fontName)}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SFProRegular,
          fontSize: 17,
          lineHeight: 24,
          color: "#007AFF",
        }}
      >
        {settingsState.fontFamily === fontName ? "􀆅" : ""}
      </Text>
    </TouchableOpacity>
  );
};

interface BackgroundSettingButtonProps {
  onPress: (color: BackgroundColor) => void;
  backgroundColor: BackgroundColor;
  isSelected: boolean;
}

const BackgroundSettingButton = ({
  onPress,
  backgroundColor,
  isSelected,
}: BackgroundSettingButtonProps) => {
  return (
    <TouchableOpacity
      containerStyle={{ overflow: "visible" }}
      style={{
        ...styles.colorButton,
        backgroundColor: backgroundColor,
        borderWidth: isSelected ? 2 : 0,
      }}
      onPress={() => onPress(backgroundColor)}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: "#007AFF",
    ...AppStyles.shadows.general,
    shadowOpacity: 0.12,
  },
});
