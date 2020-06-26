import React from "react";
import { View, Text } from "react-native";

import { AppStyles } from "../app-styles";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ReaderReactionProps {
  emotes: [string, string, string, string];
}

export const ReaderReaction = ({ emotes }: ReaderReactionProps) => {
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
        return <ReactionEmote key={i} emote={emote} />;
      })}
    </View>
  );
};

interface ReactionEmoteProps {
  emote: string;
}

const ReactionEmote = ({ emote }: ReactionEmoteProps) => {
  const [active, setActive] = React.useState(false);

  const PADDING = 8;
  const EMOTE_WIDTH = (AppStyles.screenWidth - PADDING * 3) / 4;

  return (
    <TouchableOpacity
      containerStyle={{ overflow: "visible" }}
      style={{
        ...AppStyles.shadows.general,
        overflow: "visible",
        width: EMOTE_WIDTH,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: active ? "#FDEC55" : "#fff",
        borderRadius: 10,
      }}
      onPress={() => setActive(!active)}
    >
      <Text style={{ fontSize: 24, textAlign: "center" }}>{emote}</Text>
    </TouchableOpacity>
  );
};
