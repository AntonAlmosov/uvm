import React from "react";
import { Text } from "react-native";
import { AppStyles } from "../app-styles";

interface ReaderHeadingProps {
  label: string;
}

export const ReaderHeading = ({ label }: ReaderHeadingProps) => {
  return (
    <Text
      style={{
        ...AppStyles.text.heading1,
        marginTop: 32,
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
      }}
    >
      {label}
    </Text>
  );
};
