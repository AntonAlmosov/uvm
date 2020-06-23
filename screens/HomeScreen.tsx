import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { TabHeader } from "./../components/TabHeader";
import { StoryCard } from "./../components/StoryCard";

export const HomeScreen = () => {
  const text1 =
    "«Он никак не мог представить, что же могло случиться, если ничего неизменилось. А коли была возможность, то хотя бы её эхо должно было дойти до него.»";
  const text2 = "";
  return (
    <SafeAreaView style={styles.container}>
      <TabHeader label={"Главная"} showPoints />
      <ScrollView style={{ flex: 1, paddingTop: 40 }}>
        <StoryCard
          title="День 1"
          emoji="😑"
          text={text1}
          onPress={() => {
            console.log("ti pidor");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
