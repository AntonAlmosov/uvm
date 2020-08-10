import React from "react";

import { Quote, useQuotesState, QuotesState } from "./quotes-state";

const Context = React.createContext<Model | null>(null);

interface Model {
  quotesState: QuotesState;
}

function assembleModel() {
  const quotesState = useQuotesState();

  const value = React.useMemo(() => {
    const model: Model = {
      quotesState: quotesState,
    };
    return model;
  }, [quotesState.loading, quotesState.value]);
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
