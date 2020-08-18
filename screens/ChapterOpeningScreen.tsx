import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import { NavHeader } from "../components/NavHeader";
import { AppStyles, Fonts } from "../components/app-styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useModel } from "../model/model";

export const ChapterOpeneningScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <ScrollView>
        <Text
          style={{
            marginTop: 32,
            width: AppStyles.screenWidth,
            marginLeft: AppStyles.screenPadding,
            ...AppStyles.text.heading1,
          }}
        >
          Открыть главу
        </Text>
        <Text
          style={{
            width: AppStyles.screenWidth,
            marginLeft: AppStyles.screenPadding,
            marginTop: 16,
            ...AppStyles.text.quoteCaption,
            opacity: 0.7,
            marginBottom: 12,
          }}
        >
          {
            "Новые главы открываются каждый день. За баллы можно открыть главы, которые вы пропустили (желтые) или хотите прочитать еще раз (черные). Главу можно открыть за один бал."
          }
        </Text>
        <RenderChapters />
      </ScrollView>
    </SafeAreaView>
  );
};

const monthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const sumChapters = (i: number) => {
  return monthes.slice(0, i + 1).reduce((a, b) => a + b);
};

const RenderChapters = () => {
  const daysPassed = useModel().readerState.daysPassed;
  return (
    <View
      style={{
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
      }}
    >
      {monthes.map((month, i) => {
        if (daysPassed + 1 + month > sumChapters(i))
          return <Month key={"chapter" + i} month={month} index={i} />;
      })}
    </View>
  );
};

interface MonthProps {
  month: number;
  index: number;
}

const Month = ({ index, month }: MonthProps) => {
  const [chapters, setChapters] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let curChapters: number[] = [];
    for (let i = sumChapters(index) - month; i < sumChapters(index); i++) {
      curChapters.push(i);
    }
    setChapters(curChapters);
    setLoading(false);
  }, []);

  return (
    <View style={{ width: "100%", marginBottom: 40 }}>
      <Text
        style={{
          ...AppStyles.text.heading4,
          opacity: 0.5,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {romanize(index + 1)}
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {chapters.map((i) => (
          <Chapter key={"chapter" + i} index={i} />
        ))}
      </View>
      {loading && (
        <View
          style={{
            width: "100%",
            height: (AppStyles.screenWidth / 7) * 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={"#000"} />
        </View>
      )}
    </View>
  );
};

interface ChapterProps {
  index: number;
}

const Chapter = ({ index }: ChapterProps) => {
  const daysPassed = useModel().readerState.daysPassed;
  const readChapters = useModel().readerState.readChapters;
  const chapters = useModel().readerState.chapters;
  const points = useModel().readerState.points;
  const openChapter = useModel().readerState.openChapter;
  const opened = index <= daysPassed;
  const availale = chapters.some((ch) => ch.id === index);
  const read = readChapters.includes(index);
  const callOpenerAlert = () =>
    Alert.alert(
      "Открыть главу?",
      "Глава будет доступна для чтения в течении суток, после этого она будет снова недоступна.",
      [{ text: "Да", onPress: () => openChapter(index) }, { text: "Нет" }]
    );
  const callEmptyAlert = () =>
    Alert.alert(
      "Недостаточно очков",
      "У вас недостаточно очков, чтобы открыть новые главы. Читайте главы текущего дня или делитесь приложением с друзьями, чтобы заработать очки"
    );
  return (
    <TouchableOpacity
      style={{
        width: AppStyles.screenWidth / 7,
        height: AppStyles.screenWidth / 7,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={points ? callOpenerAlert : callEmptyAlert}
      disabled={!opened || availale}
    >
      <Text
        style={{
          fontFamily: Fonts.SFProSemibold,
          fontSize: 17,
          textAlign: "center",
          color: opened
            ? availale
              ? "#39B03E"
              : read
              ? "#000"
              : "#F1D438"
            : "#ECECEC",
        }}
      >
        {index + 1}
      </Text>
    </TouchableOpacity>
  );
};

const romanize = (num: number) => {
  let digits = String(+num).split("");
  let key = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  let roman = "";
  let i = 3;
  while (i--) roman = (key[+(digits.pop() as string) + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
});
