import React from "react";
import { AppLoading } from "expo";
import { MainNavigation } from "./navigation/MainNavigation";
import * as Font from "expo-font";

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
    });
  }

  async function handleLoaded() {
    setAppLoading(true);
    console.log("App loaded");
  }

  if (isAppLoaded)
    return (
      <ModelContext>
        <MainNavigation />
      </ModelContext>
    );
  else return <AppLoading startAsync={Load} onFinish={handleLoaded} />;
}
