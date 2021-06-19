import React from "react";
import { AppLoading } from "expo";
import { MainNavigation } from "./navigation/MainNavigation";
import * as Font from "expo-font";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: "http://localhost:1337/graphql",
});

import { Fonts } from "./components/app-styles";
import { ModelContext } from "./model/model";

export default function App() {
  const [isAppLoaded, setAppLoading] = React.useState(false);

  async function Load() {
    await Font.loadAsync({
      [Fonts.NewYorkRegular]: {
        uri: require("./assets/fonts/NewYorkMedium-Regular.otf"),
      },
      [Fonts.NewYorkSemibold]: {
        uri: require("./assets/fonts/NewYorkMedium-Semibold.otf"),
      },
      [Fonts.SFProRegular]: {
        uri: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
      },
      [Fonts.SFProRegularItalic]: {
        uri: require("./assets/fonts/SF-Pro-Text-RegularItalic.otf"),
      },
      [Fonts.SFProSemibold]: {
        uri: require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
      },
      [Fonts.InterRegular]: {
        uri: require("./assets/fonts/Inter-Regular.ttf"),
      },
      [Fonts.LoraRegular]: {
        uri: require("./assets/fonts/Lora-Regular.ttf"),
      },
      [Fonts.SpectralRegular]: {
        uri: require("./assets/fonts/Spectral-Regular.ttf"),
      },
    });
  }

  async function handleLoaded() {
    setAppLoading(true);
    console.log("App loaded");
  }

  if (isAppLoaded)
    return (
      <ApolloProvider client={client}>
        <ModelContext>
          <MainNavigation />
        </ModelContext>
      </ApolloProvider>
    );
  else return <AppLoading startAsync={Load} onFinish={handleLoaded} />;
}
