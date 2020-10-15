import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AppStyles, Fonts } from "./app-styles";
import { useModel } from "../model/model";
import { Settings, BackgroundColor } from "../model/settings-state";
import { getFontSizeType, getFontSizeIndex, getFontFamilyName } from "./utils";

interface NavHeaderProps {
  title?: string;
  showSettings?: boolean;
  showTitle?: boolean;
  useSettingsConstraints?: boolean;
}

export const NavHeader = ({
  title,
  showSettings,
  showTitle,
  useSettingsConstraints,
}: NavHeaderProps) => {
  const navigation = useNavigation();
  const settingsState = useModel().settingsState;
  const fontColor =
    settingsState.backgroundColor === BackgroundColor.Dark
      ? "#E2D4D4"
      : "#000000";

  return (
    <View
      style={{
        zIndex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: useSettingsConstraints
          ? settingsState.backgroundColor
          : "#fff",
        height: 44,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          width: 44,
          height: 44,
          marginLeft: AppStyles.screenPadding,
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather
          name={"chevron-left"}
          size={24}
          color={useSettingsConstraints ? fontColor : "#000"}
          style={{ marginTop: 3 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          ...AppStyles.text.heading4,
          textAlign: "center",
          color: useSettingsConstraints ? fontColor : "#000",
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
  const [showFontsModal, setShowFontsModal] = React.useState(false);
  const settingsState = useModel().settingsState;
  const fontColor =
    settingsState.backgroundColor === BackgroundColor.Dark
      ? "#E2D4D4"
      : "#000000";

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
          justifyContent: "flex-end",
          width: 44,
          height: 44,
        }}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <MaterialCommunityIcons
          name={"format-color-text"}
          size={24}
          color={fontColor}
          style={{ marginTop: 5 }}
        />
      </TouchableOpacity>
      {(showModal || showFontsModal) && (
        <View
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
            position: "absolute",
            zIndex: 998,
            right: -16,
            top: 0,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              setShowModal(false);
              setShowFontsModal(false);
            }}
          ></TouchableOpacity>
        </View>
      )}
      {showModal && (
        <SettingsModal
          showFontsModal={() => {
            setShowFontsModal(true);
            setShowModal(false);
          }}
        />
      )}
      {showFontsModal && (
        <FontsModal
          showDefaultModal={() => {
            setShowFontsModal(false);
            setShowModal(true);
          }}
        />
      )}
    </View>
  );
};

interface SettingsModalProps {
  showFontsModal: () => void;
}

const SettingsModal = ({ showFontsModal }: SettingsModalProps) => {
  const settingsState = useModel().settingsState;
  const isBgDark = settingsState.backgroundColor === BackgroundColor.Dark;
  const fontColor = isBgDark ? "#E2D4D4" : "#000000";
  const shadow = isBgDark ? AppStyles.shadows.light : AppStyles.shadows.general;

  const handleSliderChange = (value: number) => {
    settingsState.setSetting(Settings.FontSize, getFontSizeType(value));
  };

  return (
    <View
      style={{
        zIndex: 999,
        position: "absolute",
        top: 44,
        right: 0,
        width: AppStyles.screenWidth,
        backgroundColor: settingsState.backgroundColor,
        ...shadow,
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
          color={fontColor}
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
            backgroundColor: isBgDark ? "#E2D4D4" : "#fff",
            width: 26,
            height: 26,
            borderRadius: 20,
            shadowColor: isBgDark ? "E2D4D4" : "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.28,
            shadowRadius: 4,
          }}
        />
        <MaterialCommunityIcons
          name={"format-color-text"}
          size={24}
          color={fontColor}
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
        onPress={showFontsModal}
      >
        <Text style={{ ...AppStyles.text.text, color: fontColor }}>Шрифт</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              ...AppStyles.text.text,
              color: isBgDark ? "#E2D4D4" : "#000",
              opacity: 0.5,
            }}
          >
            {getFontFamilyName(settingsState.fontFamily)}
          </Text>
          <Feather
            name={"chevron-right"}
            size={20}
            color={isBgDark ? "#E2D4D4" : "#000"}
            style={{ marginLeft: 8, marginTop: 4.5, opacity: 0.6 }}
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
        <BackgroundSettingButton
          onPress={(backgroundColor) =>
            settingsState.setSetting(Settings.BackgroundColor, backgroundColor)
          }
          backgroundColor={BackgroundColor.White}
          isSelected={settingsState.backgroundColor === BackgroundColor.White}
        />
        <BackgroundSettingButton
          onPress={(backgroundColor) =>
            settingsState.setSetting(Settings.BackgroundColor, backgroundColor)
          }
          backgroundColor={BackgroundColor.Grey}
          isSelected={settingsState.backgroundColor === BackgroundColor.Grey}
        />
        <BackgroundSettingButton
          onPress={(backgroundColor) =>
            settingsState.setSetting(Settings.BackgroundColor, backgroundColor)
          }
          backgroundColor={BackgroundColor.Beige}
          isSelected={settingsState.backgroundColor === BackgroundColor.Beige}
        />
        <BackgroundSettingButton
          onPress={(backgroundColor) =>
            settingsState.setSetting(Settings.BackgroundColor, backgroundColor)
          }
          backgroundColor={BackgroundColor.Dark}
          isSelected={settingsState.backgroundColor === BackgroundColor.Dark}
        />
      </View>
    </View>
  );
};

interface FontsModalProps {
  showDefaultModal: () => void;
}

const FontsModal = ({ showDefaultModal }: FontsModalProps) => {
  const settingsState = useModel().settingsState;
  const isBgDark = settingsState.backgroundColor === BackgroundColor.Dark;
  const fontColor = isBgDark ? "#E2D4D4" : "#000000";
  const shadow = isBgDark ? AppStyles.shadows.light : AppStyles.shadows.general;
  return (
    <View
      style={{
        zIndex: 999,
        position: "absolute",
        top: 44,
        right: 0,
        width: AppStyles.screenWidth,
        backgroundColor: settingsState.backgroundColor,
        ...shadow,
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
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={showDefaultModal}
        >
          <Feather name={"chevron-left"} size={20} color={fontColor} />
        </TouchableOpacity>
        <Text style={{ ...AppStyles.text.smallLabel, color: fontColor }}>
          Выбор шрифта
        </Text>
        <View style={{ width: 44, height: 44 }}></View>
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
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: "#007AFF",
    ...AppStyles.shadows.general,
    shadowOpacity: 0.12,
  },
});
