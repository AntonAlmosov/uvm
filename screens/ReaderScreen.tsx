import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  NativeSyntheticEvent,
  ScrollView,
  NativeScrollEvent,
  View,
  Dimensions,
} from "react-native";
import { NavHeader } from "../components/NavHeader";
import { ReaderHeading } from "../components/reader/ReaderHeading";
import { ReaderText } from "../components/reader/ReaderText";
import { ReaderReaction } from "../components/reader/ReaderReaction";
import { useModel } from "../model/model";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useChapterQuery, useChaptersQuery } from "../model/api";

type ReaderScreenRouteProps = {
  Reader: { chapter: string };
};

type ScreenProps = RouteProp<ReaderScreenRouteProps, "Reader">;

export const ReaderScreen = () => {
  const settingsState = useModel().settingsState;
  const readerState = useModel().readerState;
  const chapterId = Number(useRoute<ScreenProps>().params.chapter);
  const { data: chapter } = useChapterQuery({
    variables: { id: String(chapterId + 1) },
  });
  const [headerTitleShown, setHeaderTitleShown] = React.useState(false);

  React.useEffect(() => {
    readerState.markChapterAsRead(chapterId);
  });

  const handleTitleState = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 5) setHeaderTitleShown(true);
    else setHeaderTitleShown(false);
  };

  if (chapter?.chapter === null) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: settingsState.backgroundColor,
      }}
    >
      <NavHeader
        title={"День " + (chapterId + 1)}
        showSettings
        showTitle={headerTitleShown}
        useSettingsConstraints
      />
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: settingsState.backgroundColor,
        }}
        onScroll={(e) => handleTitleState(e)}
        scrollEventThrottle={16}
      >
        <ReaderHeading label={chapter?.chapter?.title || ""} />
        <ReaderText
          text={chapter?.chapter?.text || ""}
          origin={"День " + chapterId}
        />
        <ReaderReaction emotes={["😢", "🤔", "😇", "😤"]} chapter={chapterId} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
});
