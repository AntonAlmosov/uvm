import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./routes";
import { FavouriteScreen } from "../screens/FavouriteScreen";

export const FavouriteTabNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Favourite} component={FavouriteScreen} />
    </Stack.Navigator>
  );
};
