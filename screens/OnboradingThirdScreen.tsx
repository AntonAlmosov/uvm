import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabHeader } from "../components/TabHeader";
import { useNavigation } from "@react-navigation/native";
import { AppStyles, Fonts } from "../components/app-styles";
import { PrimaryButton } from "../components/buttons";
import { StoryCard } from "../components/home/StoryCard";
import { Routes } from "../navigation/routes";
import { Month } from "./ChapterOpeningScreen";
import { useModel } from "../model/model";

export const OnboradingThirdScreen = () => {
  const navigation = useNavigation();
  const model = useModel();
  const [chapters, setChapters] = React.useState<
    Array<{
      index: number;
      status: "read" | "opened" | "skipped" | "closed";
    }>
  >([]);

  React.useEffect(() => {
    let i = 1;
    let tmp: Array<{
      index: number;
      status: "read" | "opened" | "skipped" | "closed";
    }> = [];
    while (i < 32) {
      if (i < 17) {
        if (i === 4 || i === 10 || i === 7 || i === 15) {
          tmp.push({ index: i, status: "skipped" });
        } else {
          if (i === 1 || i === 16 || i === 15) {
            tmp.push({ index: i, status: "opened" });
          } else {
            tmp.push({ index: i, status: "read" });
          }
        }
      } else {
        tmp.push({ index: i, status: "closed" });
      }
      i = i + 1;
    }
    setChapters(tmp);
  }, []);

  return (
    <SafeAreaView
      style={{ ...styles.container, justifyContent: "space-between" }}
    >
      <View
        style={{
          flex: 1,
          width: AppStyles.screenWidth,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: AppStyles.screenPadding,
        }}
      >
        <View style={{ width: AppStyles.screenWidth - 50 }}>
          <Text
            style={{
              ...AppStyles.text.heading4,
              opacity: 0.5,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            {"I"}
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {chapters.map((i) => (
              <View
                key={i.index}
                style={{
                  width: (AppStyles.screenWidth - 50) / 7,
                  height: (AppStyles.screenWidth - 50) / 7,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.SFProSemibold,
                    fontSize: 17,
                    textAlign: "center",
                    color:
                      i.status !== "closed"
                        ? i.status == "opened"
                          ? "#39B03E"
                          : i.status === "read"
                          ? "#000"
                          : "#F1D438"
                        : "#ECECEC",
                  }}
                >
                  {i.index}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View
        style={{
          marginBottom: 40,
          width: AppStyles.screenWidth,
          justifyContent: "flex-end",
          marginLeft: AppStyles.screenPadding,
        }}
      >
        <Text
          style={{
            marginBottom: 32,
            ...AppStyles.text.quote,
          }}
        >
          Вы можете открывать недоступные главы за баллы. Баллы можно получть за
          чтение глав и за то что вы делитесь приложением с друзьями.
        </Text>
        <PrimaryButton
          label={"Начать"}
          onPress={() => {
            model.markOnboardingAsCompleted();
            navigation.navigate("tabs");
          }}
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    position: "relative",
    backgroundColor: "#fff",
  },
});
