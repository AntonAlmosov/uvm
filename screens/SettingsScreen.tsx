import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Open up settings.tsx to start working on your app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
