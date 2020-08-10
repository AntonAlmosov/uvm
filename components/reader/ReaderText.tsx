import React from "react";
import { View, Text, ActionSheetIOS, Clipboard } from "react-native";
import { AppStyles } from "../app-styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useModel } from "../../model/model";
import Toast from "react-native-root-toast";

interface ReaderTextProps {
  text: string;
  origin: string;
}

export const ReaderText = ({ text, origin }: ReaderTextProps) => {
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
        if (p.length) return <Paragraph key={i} text={p} origin={origin} />;
      })}
    </View>
  );
};

interface ParagraphProps {
  text: string;
  origin: string;
}

const Paragraph = ({ text, origin }: ParagraphProps) => {
  const quotesState = useModel().quotesState;
  const onLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Назад", "Добавить в цитаты", "Скопировать"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            quotesState.add(text, origin);
            Toast.show("Добавленно в цитаты", { opacity: 1, position: -30 });
            break;
          case 2:
            Clipboard.setString(text);
            Toast.show("Скопированно", { opacity: 1, position: -30 });
            break;
        }
      }
    );
  };
  return (
    <TouchableOpacity
      style={{ marginBottom: AppStyles.text.text.lineHeight }}
      onLongPress={onLongPress}
    >
      <Text style={{ ...AppStyles.text.text }}>{text}</Text>
    </TouchableOpacity>
  );
};
