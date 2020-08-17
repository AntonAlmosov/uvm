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
import { useModel } from "../model/model";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const readerState = useModel().readerState;
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
        {readerState.chapters.map((ch) => (
          <StoryCard
            key={ch.id}
            title={"День " + (ch.id + 1)}
            emoji={ch.smile}
            text={ch.text}
            onPress={() =>
              navigation.navigate(Routes.Reader, { chapter: ch.id })
            }
          />
        ))}
        <View style={{ marginTop: 32, paddingBottom: 128 }}>
          <HomeDataFragment
            data={readerState.timeToNextChapter}
            label={"до новой главы"}
          />
          <HomeDataFragment
            data={readerState.readChapters.length + " из 365"}
            label={"глав прочитано"}
          />
          <HomeDataFragment
            data={readerState.skippedChapters + " из 365"}
            label={"глав пропущено"}
          />
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
