import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { TabHeader } from "./../components/TabHeader";
import { StoryCard } from "../components/home/StoryCard";
import { HomeDataFragment } from "../components/home/HomeDataFragment";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../navigation/routes";
import moment from "moment";
import { calculateTime } from "../components/utils";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const timeToNextChapter = calculateTime();
  const text1 =
    "«Он никак не мог представить, что же могло случиться, если ничего неизменилось. А коли была возможность, то хотя бы её эхо должно было дойти до него.»";
  const text2 = `«Смерть – это ж признание в своей жизни.»`;
  return (
    <SafeAreaView style={styles.container}>
      <TabHeader label={"Главная"} showPoints />
      <ScrollView
        style={{ flex: 1, paddingTop: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <StoryCard
          title="День 1"
          emoji="😑"
          text={text1}
          onPress={() => navigation.navigate(Routes.Reader)}
        />
        <StoryCard
          title="День 11"
          emoji="◼️"
          text={text2}
          onPress={() => navigation.navigate(Routes.Reader)}
        />
        <View style={{ marginTop: 32, paddingBottom: 128 }}>
          <HomeDataFragment data={calculateTime()} label={"до новой главы"} />
          <HomeDataFragment data={"1 из 365"} label={"глав прочитано"} />
          <HomeDataFragment data={"27 из 365"} label={"глав пропущено"} />
        </View>
      </ScrollView>
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
