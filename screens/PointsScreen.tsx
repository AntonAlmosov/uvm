import React, { ReactChildren, ReactChild } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  Share,
} from "react-native";
import plural from "plural-ru";
import { NavHeader } from "../components/NavHeader";
import { AppStyles, Fonts } from "../components/app-styles";
import { useModel } from "../model/model";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../navigation/routes";

export const PointsScreen = () => {
  const points = useModel().readerState.points;
  const navigation = useNavigation();
  const addPoint = useModel().readerState.changePoints;
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <View
        style={{
          marginTop: 81,
          width: AppStyles.screenWidth,
          marginLeft: AppStyles.screenPadding,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: Fonts.SFProSemibold,
            fontSize: 55,
            fontWeight: "600" as "600",
          }}
        >
          {points + plural(points, " балл", " балла", " баллов")}
        </Text>
        <Text
          style={{ ...AppStyles.text.text, textAlign: "center", marginTop: 5 }}
        >
          Вы накопили
        </Text>
      </View>
      <Text
        style={{
          width: AppStyles.screenWidth,
          marginTop: 65,
          marginLeft: AppStyles.screenPadding,
          ...AppStyles.text.quoteCaption,
          opacity: 0.7,
        }}
      >
        {
          "Краткий текст о том, на что можно будет тратить баллы и как их заработать. А сейчас я буду добивать количество знаков, чтобы это выглядело примерно так-же, как текст, который будет в итоге. Такие вот дела!"
        }
      </Text>
      <View
        style={{
          width: AppStyles.screenWidth,
          marginLeft: AppStyles.screenPadding,
          marginTop: 84,
        }}
      >
        <PrimaryButton
          label={"Отправить приглашение"}
          onPress={async () => {
            const result = await Share.share(
              {
                message: "https://google.com",
              },
              {}
            );
            if (result.action === Share.sharedAction) {
              addPoint(1);
            }
          }}
          style={{ marginBottom: 5 }}
        />
        <SecondaryButton
          label={"Открыть главу"}
          onPress={() => navigation.navigate(Routes.ChapterOpening)}
          style={{ marginBottom: 5 }}
        />
      </View>
    </SafeAreaView>
  );
};

interface ButtonWrapperProps {
  onPress: () => void;
  children: ReactChild;
  style?: ViewStyle;
}

const ButtonWrapper = ({ onPress, children, style }: ButtonWrapperProps) => {
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

const PrimaryButton = ({ label, onPress, style }: ButtonProps) => {
  return (
    <ButtonWrapper
      style={{ backgroundColor: "#F1D438", ...style }}
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

const SecondaryButton = ({ label, onPress, style }: ButtonProps) => {
  return (
    <ButtonWrapper
      style={{
        backgroundColor: "#fff",
        borderColor: "#F1D438",
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
          color: "#F1D438",
        }}
      >
        {label}
      </Text>
    </ButtonWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
});
