import * as React from "react";
import { AsyncStorage } from "react-native";
import { StorageRoutes } from "../navigation/routes";

export interface Quote {
  id: string;
  value: string;
}

export interface QuotesState {
  loading: boolean;
  value: Quote[];

  update: () => void;
  add: (quote: Quote) => void;
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
      if (value) {
        setQuotes(value);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addQuote = async (quote: Quote) => {
    try {
      const value: Quote[] = [...quotes, quote];
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
      const value: Quote[] = quotes.filter((q) => q.id !== id);
      await AsyncStorage.setItem(
        StorageRoutes.Quotes,
        JSON.stringify(value),
        () => setQuotes(value)
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
