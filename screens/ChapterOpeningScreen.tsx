import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native";
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
            "Описание, как работает эта фича. Нужно будет подумать, сколько баллов стоит одна глава и все такое. На самом деле, это не так важно, и я совершенно не уверен в таком виде этого раздела."
          }
        </Text>
        <RenderChapters />
      </ScrollView>
    </SafeAreaView>
  );
};

const monthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const RenderChapters = () => {
  const monthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return (
    <View
      style={{
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
      }}
    >
      {monthes.map((month, i) => {
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
  const sumChapters = monthes.slice(0, index + 1).reduce((a, b) => a + b);

  React.useEffect(() => {
    let curChapters: number[] = [];
    for (let i = sumChapters - month; i < sumChapters; i++) {
      curChapters.push(i);
    }
    setChapters(curChapters);
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
  const openChapter = useModel().readerState.openChapter;
  const opened = index <= daysPassed;
  const availale = chapters.some((ch) => ch.id === index);
  const read = readChapters.includes(index);
  return (
    <TouchableOpacity
      style={{
        width: AppStyles.screenWidth / 7,
        height: AppStyles.screenWidth / 7,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => openChapter(index)}
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
