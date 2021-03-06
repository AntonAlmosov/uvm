import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabHeader } from "../components/TabHeader";
import { useNavigation } from "@react-navigation/native";
import { AppStyles, Fonts } from "../components/app-styles";
import { PrimaryButton } from "../components/buttons";
import { Routes } from "../navigation/routes";

export const OnboradingInitialScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ ...styles.container, justifyContent: "space-between" }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            ...AppStyles.text.heading1,
            fontSize: 50,
            lineHeight: 60,
            marginTop: 35,
            width: AppStyles.screenWidth,
            marginLeft: AppStyles.screenPadding,
          }}
        >
          {"Утро\nВечера\nМудренее"}
        </Text>
      </View>
      <View
        style={{
          marginBottom: 40,
          width: AppStyles.screenWidth,
          marginLeft: AppStyles.screenPadding,
        }}
      >
        <Text
          style={{
            marginBottom: 32,
            ...AppStyles.text.quote,
          }}
        >
          «Утро вечера мудренее» – полномасштабная иллюстрация жизни русского
          деревенского человека, потерянного во времени и себе. Ежедневно на
          протяжении года мы будем следить за его жизнью
        </Text>
        <PrimaryButton
          label={"Далее"}
          onPress={() => navigation.navigate(Routes.Onboarding.Second)}
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
    backgroundColor: "#fff",
  },
});
