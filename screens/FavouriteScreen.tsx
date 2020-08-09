import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TabHeader } from "../components/TabHeader";
import { useModel } from "../model/model";
import { AppStyles } from "../components/app-styles";

export const FavouriteScreen = () => {
  const qoutesState = useModel().quotesState;

  const decideOnComponent = () => {
    if (qoutesState.value.length) return null;
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
        {`Нажмите на абзац из текста \n чтобы добавить цитату`}
      </Text>
    </View>
  );
};

const QuotesList = () => {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
