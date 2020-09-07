import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabHeader } from "../components/TabHeader";
import { useNavigation } from "@react-navigation/native";
import { AppStyles, Fonts } from "../components/app-styles";
import { PrimaryButton } from "../components/buttons";
import { StoryCard } from "../components/home/StoryCard";
import { Routes } from "../navigation/routes";

export const OnboradingSecondScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ ...styles.container, justifyContent: "space-between" }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StoryCard
          title={"День 7"}
          emoji={"👵"}
          disabled
          onPress={() => {}}
          text={
            "Бог-то богом, но если все его молитвы читать, то и на хлеб времени не хватит."
          }
        />
      </View>
      <View
        style={{
          marginBottom: 40,
          width: AppStyles.screenWidth,
          justifyContent: "flex-end",
          height: 200,
          marginLeft: AppStyles.screenPadding,
        }}
      >
        <Text
          style={{
            marginBottom: 32,
            ...AppStyles.text.quote,
          }}
        >
          Новый день — новая глава. У вас будет ровно двое суток на то чтобы ее
          прочитать. Следите за жизнью Сома, станьте Сомом, живите будучи Сомом.
        </Text>
        <PrimaryButton
          label={"Далее"}
          onPress={() => navigation.navigate(Routes.Onboarding.Third)}
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
