import React from "react";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "./../screens/HomeScreen";
import { FavouriteScreen } from "./../screens/FavouriteScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { Routes } from "./routes";

export const MainNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName = "";

            if (route.name === Routes.Home) {
              iconName = "home";
            }
            if (route.name === Routes.Settings) {
              iconName = "settings";
            }
            if (route.name === Routes.Favourite) {
              iconName = "star";
            }

            return <Feather name={iconName} size={24} color={color} />;
          },
        })}
        initialRouteName={Routes.Home}
        tabBarOptions={tabBarOption}
      >
        <Tab.Screen name={Routes.Favourite} component={FavouriteScreen} />
        <Tab.Screen name={Routes.Home} component={HomeScreen} />
        <Tab.Screen name={Routes.Settings} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const tabBarOption = {
  activeTintColor: "#000",
  inactiveTintColor: "#808080",
  showLabel: false,
  style: { borderTopWidth: 0, backgroundColor: "#fff" },
};
