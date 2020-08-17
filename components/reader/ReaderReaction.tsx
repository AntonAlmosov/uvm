import React from "react";
import { View, Text } from "react-native";

import { AppStyles } from "../app-styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useModel } from "../../model/model";
import { BackgroundColor } from "../../model/settings-state";

interface ReaderReactionProps {
  emotes: [string, string, string, string];
  chapter: number;
}

export const ReaderReaction = ({ emotes, chapter }: ReaderReactionProps) => {
  const toggleEmotions = useModel().readerState.toggleChapterEmotion;
  const chapterEmotions = useModel().readerState.chapterEmotions;
  return (
    <View
      style={{
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 75,
        marginBottom: 66,
      }}
    >
      {emotes.map((emote, i) => {
        return (
          <ReactionEmote
            key={i}
            emote={emote}
            initialState={chapterEmotions[chapter].emotions[i]}
            onPress={() => toggleEmotions(chapter, i)}
          />
        );
      })}
    </View>
  );
};

interface ReactionEmoteProps {
  emote: string;
  initialState: boolean;
  onPress: () => void;
}

const ReactionEmote = ({
  emote,
  onPress,
  initialState,
}: ReactionEmoteProps) => {
  const settingsState = useModel().settingsState;
  const fontColor =
    settingsState.backgroundColor === BackgroundColor.Dark
      ? "#E2D4D4"
      : "#000000";
  const shadow =
    settingsState.backgroundColor === BackgroundColor.Dark
      ? AppStyles.shadows.light
      : AppStyles.shadows.general;

  const [active, setActive] = React.useState(initialState);

  const PADDING = 8;
  const EMOTE_WIDTH = (AppStyles.screenWidth - PADDING * 3) / 4;

  return (
    <TouchableOpacity
      containerStyle={{ overflow: "visible" }}
      style={{
        ...shadow,
        overflow: "visible",
        width: EMOTE_WIDTH,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: active ? "#FDEC55" : settingsState.backgroundColor,
        borderRadius: 10,
      }}
      onPress={() => {
        setActive(!active);
        onPress();
      }}
    >
      <Text style={{ fontSize: 24, textAlign: "center" }}>{emote}</Text>
    </TouchableOpacity>
  );
};
