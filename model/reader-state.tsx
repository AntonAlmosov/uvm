import * as React from "react";
import { AsyncStorage } from "react-native";
import { StorageRoutes } from "../navigation/routes";
import uuid from "react-native-uuid";
import moment from "moment";
import { calculateTime } from "../components/utils";

export interface Chapter {
  id: number;
}

export interface ChapterEmotion {
  chapter: number;
  emotions: [boolean, boolean, boolean, boolean];
}

export interface OpenedChapter {
  id: number;
  date: string;
}

export interface ReaderState {
  chapters: Chapter[];
  points: number;
  readChapters: number[];
  skippedChapters: number;
  timeToNextChapter: string;
  daysPassed: number;
  chapterEmotions: ChapterEmotion[];

  loading: boolean;
  changePoints: (amount: number) => void;
  markChapterAsRead: (id: number) => void;
  openChapter: (id: number) => void;
  toggleChapterEmotion: (chapter: number, index: number) => void;
}

export function useReaderState() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [daysPassed, setDaysPassed] = React.useState<number>(0);
  const [readChapters, setReadChapters] = React.useState<number[]>([]);
  const [points, setPoints] = React.useState<number>(0);
  const [openedChapters, setOpenedChapters] = React.useState<OpenedChapter[]>(
    []
  );
  const [timeToNextChapter, setTimeToNextChapter] = React.useState<string>("");
  const [chapterEmotions, setChapterEmotions] = React.useState<
    ChapterEmotion[]
  >([]);

  const onAppLoad = async () => {
    setTimeToNextChapter(calculateTime());
    await getChapters();
    await getReadChapters();
    await getPoints();
    await getOpenedChapters();
    await getChapters();
    await getChapterEmotions();
    setLoading(false);
  };

  const handleFirstAppLoad = async () => {
    const initialDate = moment().startOf("day").format("x");
    await AsyncStorage.setItem(StorageRoutes.InitialDate, initialDate);
    await AsyncStorage.setItem(
      StorageRoutes.ReadChapters,
      JSON.stringify([]),
      () => setReadChapters([])
    );
    await AsyncStorage.setItem(
      StorageRoutes.OpenedChapters,
      JSON.stringify([]),
      () => setOpenedChapters([])
    );
    await AsyncStorage.setItem(StorageRoutes.Points, String(1), () =>
      setPoints(1)
    );
    const chapterEmotions: ChapterEmotion[] = [];
    for (let i = 0; i <= 365; i++) {
      chapterEmotions.push({
        chapter: i,
        emotions: [false, false, false, false],
      });
    }
    await AsyncStorage.setItem(
      StorageRoutes.ChapterEmotions,
      JSON.stringify(chapterEmotions),
      () => setChapterEmotions(chapterEmotions)
    );
  };

  const getChapterEmotions = async () => {
    const value = await AsyncStorage.getItem(StorageRoutes.ChapterEmotions);
    if (value) setChapterEmotions(JSON.parse(value) as ChapterEmotion[]);
  };

  const getChapters = async () => {
    const value = await AsyncStorage.getItem(StorageRoutes.InitialDate);
    //Setting initial date
    if (!value) {
      await handleFirstAppLoad();
      return [{ id: 0 }];
    }
    const currentDay = moment().startOf("day");
    const currentDaysPassed = currentDay.diff(moment(value, "x"), "day");
    setDaysPassed(currentDaysPassed);
    const opened = openedChapters.map((ch) => {
      return { id: ch.id };
    });

    setChapters([{ id: currentDaysPassed }, ...opened]);
  };

  const getReadChapters = async () => {
    const value = await AsyncStorage.getItem(StorageRoutes.ReadChapters);
    setReadChapters(JSON.parse(value || "[]") as number[]);
  };

  const getOpenedChapters = async () => {
    const value: OpenedChapter[] = JSON.parse(
      (await AsyncStorage.getItem(StorageRoutes.OpenedChapters)) || "[]"
    );
    const actualValue = value.filter((v) => {
      const date = moment(v.date, "x");
      return moment().format("x") < date.add(1, "day").format("x");
    });
    if (actualValue.length !== value.length) {
      await AsyncStorage.setItem(
        StorageRoutes.OpenedChapters,
        JSON.stringify(actualValue)
      );
    }
    setOpenedChapters(actualValue);
  };

  const getPoints = async () => {
    const value = await AsyncStorage.getItem(StorageRoutes.Points);
    setPoints(Number(value) || 0);
  };

  const changePoints = async (amount: number) => {
    await AsyncStorage.setItem(
      StorageRoutes.Points,
      String(points + amount),
      () => setPoints(points + amount)
    );
  };

  const markAsRead = async (id: number) => {
    if (loading) {
      return;
    }
    if (readChapters.includes(id)) {
      return;
    }

    await AsyncStorage.setItem(
      StorageRoutes.ReadChapters,
      JSON.stringify([...readChapters, id]),
      () => setReadChapters([...readChapters, id])
    );
    if (!openedChapters.some((ch) => ch.id === id)) await changePoints(1);
  };

  const openChapter = async (id: number) => {
    const chapter = { id, date: moment().format("x") };
    await AsyncStorage.setItem(
      StorageRoutes.OpenedChapters,
      JSON.stringify([...openedChapters, chapter]),
      () => setOpenedChapters([...openedChapters, chapter])
    );
    await changePoints(-1);
    await getOpenedChapters();
  };

  const toggleChapterEmotion = async (chapter: number, index: number) => {
    const emotionsCopy = chapterEmotions;
    emotionsCopy[chapter].emotions[index] =
      !emotionsCopy[chapter].emotions[index];
    await AsyncStorage.setItem(
      StorageRoutes.ChapterEmotions,
      JSON.stringify(emotionsCopy),
      () => setChapterEmotions(emotionsCopy)
    );
  };

  React.useEffect(() => {
    onAppLoad();
  }, []);

  React.useEffect(() => {
    getChapters();
  }, [openedChapters]);

  return React.useMemo(() => {
    const skippedChapters = daysPassed + 1 - readChapters.length;
    const state: ReaderState = {
      chapters,
      points,
      readChapters,
      skippedChapters: skippedChapters < 0 ? 0 : skippedChapters,
      timeToNextChapter,
      daysPassed,
      chapterEmotions,

      loading,
      changePoints,
      markChapterAsRead: (id: number) => markAsRead(id),
      openChapter,
      toggleChapterEmotion,
    };
    return state;
  }, [
    loading,
    chapters,
    daysPassed,
    readChapters,
    points,
    openedChapters,
    chapterEmotions,
  ]);
}
