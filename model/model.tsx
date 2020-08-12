import React from "react";

import { Quote, useQuotesState, QuotesState } from "./quotes-state";
import { useSettingsState, SettingsState } from "./settings-state";

const Context = React.createContext<Model | null>(null);

interface Model {
  quotesState: QuotesState;
  settingsState: SettingsState;
}

function assembleModel() {
  const quotesState = useQuotesState();
  const settingsState = useSettingsState();

  const value = React.useMemo(() => {
    const model: Model = {
      quotesState,
      settingsState,
    };
    return model;
  }, [quotesState, settingsState]);
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
