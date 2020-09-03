import React, { ReactChildren, ReactChild } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  Share,
} from "react-native";
import plural from "plural-ru";
import { NavHeader } from "../components/NavHeader";
import { AppStyles, Fonts } from "../components/app-styles";
import { useModel } from "../model/model";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../navigation/routes";
import { SecondaryButton, PrimaryButton } from "../components/buttons";

export const PointsScreen = () => {
  const points = useModel().readerState.points;
  const navigation = useNavigation();
  const addPoint = useModel().readerState.changePoints;
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <ScrollView>
        <View
          style={{
            marginTop: 32,
            width: AppStyles.screenWidth,
            marginLeft: AppStyles.screenPadding,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: Fonts.SFProSemibold,
              fontSize: 40,
              fontWeight: "600" as "600",
            }}
            adjustsFontSizeToFit
          >
            {points + plural(points, " балл", " балла", " баллов")}
          </Text>
          <Text
            style={{
              ...AppStyles.text.text,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            Вы накопили
          </Text>
        </View>
        <Text
          style={{
            width: AppStyles.screenWidth,
            marginTop: 32,
            marginLeft: AppStyles.screenPadding,
            ...AppStyles.text.quoteCaption,
            opacity: 0.7,
          }}
        >
          {
            "Баллы используются для открытия глав, которые вы не успели прочитать. Их можно заработать читая главы текущего дня или поделившись приложением с друзьями, нажав на кнопку ниже."
          }
        </Text>
        <View
          style={{
            width: AppStyles.screenWidth,
            marginLeft: AppStyles.screenPadding,
            marginTop: 32,
          }}
        >
          <PrimaryButton
            label={"Отправить приглашение"}
            onPress={async () => {
              const result = await Share.share(
                {
                  message:
                    "«Утро Вечера Мудренее», рассказ каждый день: \n https://testflight.apple.com/join/kbrFGKJh",
                },
                {}
              );
              if (result.action === Share.sharedAction) {
                addPoint(1);
              }
            }}
            style={{ marginBottom: 5 }}
          />
          <SecondaryButton
            label={"Открыть главу"}
            onPress={() => navigation.navigate(Routes.ChapterOpening)}
            style={{ marginBottom: 5 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
});
