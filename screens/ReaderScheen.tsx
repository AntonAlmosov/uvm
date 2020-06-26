import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavHeader } from "../components/NavHeader";

export const ReaderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={"День 1"} showSettings />
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
