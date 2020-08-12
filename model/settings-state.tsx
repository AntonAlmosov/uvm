import * as React from "react";
import { AsyncStorage } from "react-native";

import { Fonts } from "../components/app-styles";

export enum Settings {
  FontSize = "FontSize",
  FontFamily = "FontFamily",
  BackgroundColor = "BackgroundColor",
}

export enum BackgroundColor {
  White = "#FFFFFF",
  Grey = "#ECECEC",
  Beige = "#EAE6DB",
  Dark = "#201F1E",
}

export enum FontSize {
  Smallest = "textSmallest",
  Small = "textSmall",
  Default = "text",
  Big = "textBig",
  Biggest = "textBiggest",
}

export interface SettingsState {
  loading: boolean;
  fontSize: FontSize;
  fontFamily: Fonts;
  backgroundColor: BackgroundColor;

  setSetting: (
    setting: Settings,
    value: BackgroundColor | FontSize | Fonts
  ) => void;
}

export function useSettingsState() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [fontSize, setFontSize] = React.useState<FontSize>(FontSize.Default);
  const [fontFamily, setFontFamily] = React.useState<Fonts>(Fonts.SFProRegular);
  const [backgroundColor, setBackgroundColor] = React.useState<BackgroundColor>(
    BackgroundColor.White
  );

  const getSettings = async () => {
    try {
      for (let setting in Settings) {
        const value: string | null = await AsyncStorage.getItem(setting);
        switch (setting) {
          case Settings.FontSize:
            setFontSize((value as FontSize) || FontSize.Default);
            break;
          case Settings.FontFamily:
            setFontFamily((value as Fonts) || Fonts.SFProRegular);
            break;
          case Settings.BackgroundColor:
            setBackgroundColor(
              (value as BackgroundColor) || BackgroundColor.White
            );
            break;
        }
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const setSetting = async (
    setting: Settings,
    value: BackgroundColor | FontSize | Fonts
  ) => {
    try {
      await AsyncStorage.setItem(setting, value, () => {
        switch (setting) {
          case Settings.FontFamily:
            setFontFamily(value as Fonts);
            break;
          case Settings.FontSize:
            setFontSize(value as FontSize);
            break;
          case Settings.BackgroundColor:
            setBackgroundColor(value as BackgroundColor);
            break;
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getSettings();
  }, []);

  return React.useMemo(() => {
    const state: SettingsState = {
      loading,
      fontSize,
      fontFamily,
      backgroundColor,

      setSetting,
    };
    return state;
  }, [loading, fontSize, fontFamily, backgroundColor]);
}
