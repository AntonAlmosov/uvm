import React from "react";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SettingsScreen } from "../screens/SettingsScreen";
import { Routes } from "./routes";
import { HomeTabNavigator } from "./HomeTabNavigator";
import { ReaderScreen } from "../screens/ReaderScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { FavouriteTabNavigator } from "./FavouriteTabNavigator";

export const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"tabs"} component={TabNavigator} />
        <Stack.Screen name={Routes.Reader} component={ReaderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = "";

          if (route.name === Routes.HomeNavigator) {
            iconName = "home";
          }
          if (route.name === Routes.Settings) {
            iconName = "settings";
          }
          if (route.name === Routes.FavouriteNavigator) {
            iconName = "star";
          }

          return <Feather name={iconName} size={24} color={color} />;
        },
      })}
      initialRouteName={Routes.HomeNavigator}
      tabBarOptions={tabBarOption}
    >
      <Tab.Screen
        name={Routes.FavouriteNavigator}
        component={FavouriteTabNavigator}
      />
      <Tab.Screen name={Routes.HomeNavigator} component={HomeTabNavigator} />
      <Tab.Screen name={Routes.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const tabBarOption = {
  activeTintColor: "#000",
  inactiveTintColor: "#808080",
  showLabel: false,
  style: { borderTopWidth: 0, backgroundColor: "#fff" },
};
