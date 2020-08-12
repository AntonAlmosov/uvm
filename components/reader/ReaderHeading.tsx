import React from "react";
import { Text } from "react-native";
import { AppStyles } from "../app-styles";
import { useModel } from "../../model/model";
import { BackgroundColor } from "../../model/settings-state";

interface ReaderHeadingProps {
  label: string;
}

export const ReaderHeading = ({ label }: ReaderHeadingProps) => {
  const settingsState = useModel().settingsState;
  const fontColor =
    settingsState.backgroundColor === BackgroundColor.Dark
      ? "#E2D4D4"
      : "#000000";
  return (
    <Text
      style={{
        ...AppStyles.text.heading1,
        marginTop: 32,
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
        color: fontColor,
      }}
    >
      {label}
    </Text>
  );
};
