import React, { ReactChild } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, ViewStyle } from "react-native";
import { Fonts, AppStyles } from "./app-styles";

interface ButtonWrapperProps {
  onPress: () => void;
  children: ReactChild;
  style?: ViewStyle;
}

export const ButtonWrapper = ({
  onPress,
  children,
  style,
}: ButtonWrapperProps) => {
  return (
    <TouchableOpacity
      style={{
        ...style,
        width: AppStyles.screenWidth,
        height: AppStyles.screenWidth * 0.15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

interface ButtonProps {
  label: string;
  onPress: () => void;
  style: ViewStyle;
}

export const PrimaryButton = ({ label, onPress, style }: ButtonProps) => {
  return (
    <ButtonWrapper
      style={{ backgroundColor: "#F19C38", ...style }}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: Fonts.SFProSemibold,
          fontSize: 17,
          fontWeight: "600" as "600",
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </ButtonWrapper>
  );
};

export const SecondaryButton = ({ label, onPress, style }: ButtonProps) => {
  return (
    <ButtonWrapper
      style={{
        backgroundColor: "#fff",
        borderColor: "#F19C38",
        borderWidth: 2,
        ...style,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: Fonts.SFProSemibold,
          fontSize: 17,
          fontWeight: "600" as "600",
          color: "#F19C38",
        }}
      >
        {label}
      </Text>
    </ButtonWrapper>
  );
};
