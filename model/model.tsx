import React from "react";

import { Quote, useQuotesState, QuotesState } from "./quotes-state";
import { useSettingsState, SettingsState } from "./settings-state";
import { useReaderState, ReaderState } from "./reader-state";

const Context = React.createContext<Model | null>(null);

interface Model {
  quotesState: QuotesState;
  settingsState: SettingsState;
  readerState: ReaderState;
}

function assembleModel() {
  const quotesState = useQuotesState();
  const settingsState = useSettingsState();
  const readerState = useReaderState();

  const value = React.useMemo(() => {
    const model: Model = {
      quotesState,
      settingsState,
      readerState,
    };
    return model;
  }, [quotesState, settingsState, readerState]);
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
