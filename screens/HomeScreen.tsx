import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { TabHeader } from "./../components/TabHeader";
import { StoryCard } from "../components/home/StoryCard";
import { HomeDataFragment } from "../components/home/HomeDataFragment";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../navigation/routes";
import { useModel } from "../model/model";
import { PrimaryButton } from "../components/buttons";
import { AppStyles } from "../components/app-styles";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const readerState = useModel().readerState;
  return (
    <SafeAreaView style={styles.container}>
      <TabHeader label={"Главная"} showPoints />
      {readerState.loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={"#000"} />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, paddingTop: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {readerState.chapters.map((ch) => (
            <StoryCard
              key={ch.id}
              id={ch.id}
              onPress={() =>
                navigation.navigate(Routes.Reader, { chapter: ch.id })
              }
            />
          ))}
          {readerState.daysPassed > 2 && (
            <PrimaryButton
              label={"Открыть главу"}
              style={{ marginLeft: AppStyles.screenPadding }}
              onPress={() => navigation.navigate(Routes.ChapterOpening)}
            />
          )}
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
      )}
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
