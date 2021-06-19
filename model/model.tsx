import React from "react";

import { Quote, useQuotesState, QuotesState } from "./quotes-state";
import { useSettingsState, SettingsState } from "./settings-state";
import { useReaderState, ReaderState } from "./reader-state";
import { AsyncStorage } from "react-native";
import { StorageRoutes } from "../navigation/routes";
import { useChapterQuery, useChaptersQuery } from "./api";

const Context = React.createContext<Model | null>(null);

interface Model {
  quotesState: QuotesState;
  settingsState: SettingsState;
  readerState: ReaderState;
  onboardingPassed: boolean;
  markOnboardingAsCompleted: () => void;
}

function assembleModel() {
  const quotesState = useQuotesState();
  const settingsState = useSettingsState();
  const readerState = useReaderState();
  const [onboardingPassed, setOnboardingPassed] = React.useState(true);

  AsyncStorage.getItem(StorageRoutes.OnboardingPassed, (err, res) => {
    setOnboardingPassed(res === "true" ? true : false);
  });

  const markOnboardingAsCompleted = async () => {
    await AsyncStorage.setItem(StorageRoutes.OnboardingPassed, "true", () =>
      setOnboardingPassed(true)
    );
  };

  const value = React.useMemo(() => {
    const model: Model = {
      quotesState,
      settingsState,
      readerState,
      onboardingPassed,
      markOnboardingAsCompleted,
    };
    return model;
  }, [quotesState, settingsState, readerState, onboardingPassed]);
  return value;
}

interface Props {
  children: React.ReactNode;
}

export function ModelContext(props: Props) {
  const value = assembleModel();
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useModel() {
  const model = React.useContext(Context);
  if (!model) {
    throw "Model can not be used outside the model context";
  }
  return model;
}
