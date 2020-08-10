import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ActionSheetIOS,
  Clipboard,
  Share,
} from "react-native";
import { TabHeader } from "../components/TabHeader";
import { useModel } from "../model/model";
import { AppStyles } from "../components/app-styles";
import { Quote } from "../model/quotes-state";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";

export const FavouriteScreen = () => {
  const qoutesState = useModel().quotesState;

  const decideOnComponent = () => {
    if (qoutesState.value.length)
      return <QuotesList quotes={qoutesState.value} />;
    else return <QuotesEmpty />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader label={"Цитаты"} showPoints />
      <QuotesLoading loading={qoutesState.loading} />
      {!qoutesState.loading && decideOnComponent()}
    </SafeAreaView>
  );
};

interface QuotesLoadingProps {
  loading: boolean;
}

const QuotesLoading = ({ loading }: QuotesLoadingProps) => {
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"#000"} />
      </View>
    );
  return null;
};

const QuotesEmpty = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          ...AppStyles.text.heading2,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Здесь пока ничего нет!
      </Text>
      <Text style={{ ...AppStyles.text.quoteCaption, textAlign: "center" }}>
        {`Нажмите на абзац из текста и удерживайте, чтобы добавить цитату`}
      </Text>
    </View>
  );
};

interface QuotesListProps {
  quotes: Quote[];
}

const QuotesList = ({ quotes }: QuotesListProps) => {
  return (
    <ScrollView style={{ flex: 1, paddingTop: 40 }}>
      {quotes.map((q, i) => (
        <QuoteItem key={i} {...q} />
      ))}
    </ScrollView>
  );
};

const QuoteItem = ({ value, origin, id }: Quote) => {
  const quotesState = useModel().quotesState;

  const onLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Назад", "Убрать из цитат", "Скопировать", "Поделиться"],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            quotesState.remove(id);
            break;
          case 2:
            Clipboard.setString(value);
            Toast.show("Скопированно", { opacity: 1, position: -30 });
            break;
          case 3:
            Share.share({
              message: value,
            });
            break;
        }
      }
    );
  };
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      style={{
        marginBottom: 32,
        width: AppStyles.screenWidth,
        marginLeft: AppStyles.screenPadding,
      }}
    >
      <Text style={{ ...AppStyles.text.heading3, marginBottom: 8 }}>
        {origin}
      </Text>
      <Text style={{ ...AppStyles.text.text }}>{"«" + value + "»"}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
