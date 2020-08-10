import * as React from "react";
import { AsyncStorage } from "react-native";
import { StorageRoutes } from "../navigation/routes";
import uuid from "react-native-uuid";

export interface Quote {
  id: string;
  value: string;
  origin: string;
}

export interface QuotesState {
  loading: boolean;
  value: Quote[];

  update: () => void;
  add: (value: string, origin: string) => void;
  remove: (id: string) => void;
}

export function useQuotesState() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quotes, setQuotes] = React.useState<Quote[]>([]);

  const getQuotes = async () => {
    try {
      const value: Quote[] = await AsyncStorage.getItem(
        StorageRoutes.Quotes
      ).then((res) => JSON.parse(res || "[]"));
      setQuotes(value);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const addQuote = async (value: string, origin: string) => {
    const alreadyQuoted = quotes.some((q) => q.value === value);
    if (alreadyQuoted) {
      return;
    }

    const newQuote: Quote = { id: uuid.v4(), value, origin };
    try {
      const value: Quote[] = [...quotes, newQuote];
      await AsyncStorage.setItem(
        StorageRoutes.Quotes,
        JSON.stringify(value),
        () => setQuotes(value)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeQuote = async (id: string) => {
    try {
      const nextValue: Quote[] = quotes.filter((q) => q.id !== id);
      await AsyncStorage.setItem(
        StorageRoutes.Quotes,
        JSON.stringify(nextValue),
        () => setQuotes(nextValue)
      );
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getQuotes();
  }, []);

  return React.useMemo(() => {
    const state: QuotesState = {
      loading: loading,
      value: quotes,

      update: getQuotes,
      add: addQuote,
      remove: removeQuote,
    };
    return state;
  }, [quotes, loading]);
}
