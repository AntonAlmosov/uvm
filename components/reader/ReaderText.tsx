import React from "react";
import { View, Text } from "react-native";
import { AppStyles } from "../app-styles";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ReaderTextProps {
  text: string;
}

export const ReaderText = ({ text }: ReaderTextProps) => {
  const splitedText = text.split(`\n`);
  return (
    <View
      style={{
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
        marginTop: 60,
      }}
    >
      {splitedText.map((p, i) => {
        if (p.length) return <Paragraph key={i} text={p} />;
      })}
    </View>
  );
};

interface ParagraphProps {
  text: string;
}

const Paragraph = ({ text }: ParagraphProps) => {
  return (
    <TouchableOpacity style={{ marginBottom: AppStyles.text.text.lineHeight }}>
      <Text style={{ ...AppStyles.text.text }}>{text}</Text>
    </TouchableOpacity>
  );
};
