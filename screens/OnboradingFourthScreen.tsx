import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabHeader } from "../components/TabHeader";
import { useNavigation } from "@react-navigation/native";
import { AppStyles, Fonts } from "../components/app-styles";
import { PrimaryButton } from "../components/buttons";
import { StoryCard } from "../components/home/StoryCard";
import { Routes } from "../navigation/routes";
import { Month } from "./ChapterOpeningScreen";
import { useModel } from "../model/model";

export const OnboradingFourthScreen = () => {
  const navigation = useNavigation();
  const model = useModel();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: AppStyles.screenWidth,
          justifyContent: "center",
        }}
      ></View>
      <Text
        style={{
          marginLeft: 16,
          width: AppStyles.screenWidth,
          ...AppStyles.text.quote,
        }}
      >
        Внимание! Если вы заняты рутинной работой, ежедневное чтение может иметь
        разрушительное действие на вашу жизнь. Нет, это не шутка.
      </Text>
      <View
        style={{
          marginBottom: 40,
          width: AppStyles.screenWidth,
          justifyContent: "flex-end",
          marginLeft: AppStyles.screenPadding,
        }}
      >
        <PrimaryButton
          label={"Начать"}
          onPress={() => {
            model.markOnboardingAsCompleted();
            navigation.navigate("tabs");
          }}
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    position: "relative",
    backgroundColor: "#fff",
  },
});
