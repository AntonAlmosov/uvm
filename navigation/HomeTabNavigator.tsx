import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "./../screens/HomeScreen";
import { Routes } from "./routes";

export const HomeTabNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};
