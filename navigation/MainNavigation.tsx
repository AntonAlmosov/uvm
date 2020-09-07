import React from "react";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SettingsScreen } from "../screens/SettingsScreen";
import { Routes } from "./routes";
import { HomeTabNavigator } from "./HomeTabNavigator";
import { ReaderScreen } from "../screens/ReaderScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { FavouriteTabNavigator } from "./FavouriteTabNavigator";
import { PointsScreen } from "../screens/PointsScreen";
import { ChapterOpeneningScreen } from "../screens/ChapterOpeningScreen";
import { OnboradingInitialScreen } from "../screens/OnboradingInitialScreen";
import { useModel } from "../model/model";
import { OnboradingSecondScreen } from "../screens/OnboradingSecondScreen";
import { OnboradingThirdScreen } from "../screens/OnboradingThirdScreen";

export const MainNavigation = () => {
  const model = useModel();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"tabs"} component={TabNavigator} />
        <Stack.Screen
          name={"onboradingStack"}
          component={OnboardingNavigator}
        />
        <Stack.Screen name={Routes.Points} component={PointsScreen} />
        <Stack.Screen
          name={Routes.ChapterOpening}
          component={ChapterOpeneningScreen}
        />
        <Stack.Screen name={Routes.Reader} component={ReaderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const OnboardingNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Routes.Onboarding.Initial}
        component={OnboradingInitialScreen}
      />
      <Stack.Screen
        name={Routes.Onboarding.Second}
        component={OnboradingSecondScreen}
      />
      <Stack.Screen
        name={Routes.Onboarding.Third}
        component={OnboradingThirdScreen}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const model = useModel();
  const navigation = useNavigation();
  React.useEffect(() => {
    if (!model.onboardingPassed) {
      navigation.navigate("onboradingStack");
    }
  }, [model]);
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
