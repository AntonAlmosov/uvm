import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  NativeSyntheticEvent,
  ScrollView,
  NativeScrollEvent,
  View,
  Dimensions,
} from "react-native";
import { NavHeader } from "../components/NavHeader";
import { ReaderHeading } from "../components/reader/ReaderHeading";
import { ReaderText } from "../components/reader/ReaderText";
import { ReaderReaction } from "../components/reader/ReaderReaction";
import { useModel } from "../model/model";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { data } from "../model/data.json";

type ReaderScreenRouteProps = {
  Reader: { chapter: string };
};

type ScreenProps = RouteProp<ReaderScreenRouteProps, "Reader">;

export const ReaderScreen = () => {
  const settingsState = useModel().settingsState;
  const readerState = useModel().readerState;
  const navigation = useNavigation();
  const chapterId = Number(useRoute<ScreenProps>().params.chapter);
  const chapter = data[chapterId];
  const [headerTitleShown, setHeaderTitleShown] = React.useState(false);

  useFocusEffect(() => {
    readerState.markChapterAsRead(chapterId);
  });

  const handleTitleState = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 5) setHeaderTitleShown(true);
    else setHeaderTitleShown(false);
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: settingsState.backgroundColor,
      }}
    >
      <NavHeader
        title={"День " + (chapterId + 1)}
        showSettings
        showTitle={headerTitleShown}
        useSettingsConstraints
      />
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: settingsState.backgroundColor,
        }}
        onScroll={(e) => handleTitleState(e)}
        scrollEventThrottle={16}
      >
        <ReaderHeading label={chapter.title} />
        <ReaderText
          text={chapter.datatext}
          origin={"День " + (chapterId + 1)}
        />
        <ReaderReaction emotes={["😖", "🙃", "🎰", "🐹"]} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
});

const text = `Зааукал старый петух.
Сом открыл глаз в окно, там свет пришёл до солнца. Он поднялся, вставил ноги в домашние подошвы и вспомнил вчера. Она ему сказала, что же она ему сказала, на что он ответил: не сегодня?
Плеснул в горло воды пустой, губами зашамкал серый мякиш, а корку в карман убрал. Пора и в путь. Лопуховой росой протёр морщины, зевнул да прищурился: солнце за углом дома. Трава примята, сонна. Он шёл тропинкой и всегда сбивал шагам счёт.

«Если этого не случилось, думал мельник, тогда зачем знать, что она сказала? Видно, придётся подождать: не сегодня, так завтра. А покуда земля носит, дóлжно стараться. Жизнь хороша, терпеть можно. Вот и колодец трудится по часовой и против».

Девкин камень лежал на своём месте.

Сом глядел в пустые очи домов. В каждом тихо билось чужое сердце, такое же, как у него. В прогоне меж Темновым домом и домом Кривых виднелась церковь соседнего села. Он посмотрел на её обветшалые плечи, а потом на свои. Впереди река и смерть.

«Сегодня есть надежда, мечтал Сом, в это время что-то да случается. Вот, например, вчера что-то было. Вечером приду, спрошу, что же было».

И он никак не мог представить, что же могло случиться, если ничего не изменилось. А коли была возможность, то хотя бы её эхо должно было дойти до него.

Плашкотный мост лежал тихой разъевшейся сороконожкой. Сом слушал глухой стук своих шагов. Ровно так же стучали шаги любого проходившего здесь. Он остановился на середине и посмотрел на воду. Вытащил из кармана нагретый камень, посмотрел на него и бросил высоко вверх. Камень булькнул.

Сом улыбнулся и пошёл дальше. Природа не являет чудес зараз, а вода всё же поднимается.

С холма спускался косой мальчик Федька, идущий в пустоту перед собой. В руке он сжимал надкушенную сливу.

– Здарова, Сом! – Крикнул Федька. – Всё усы растишь да небо коптишь, молчаливая ты рыба!

Сом вытащил из кармана хлебную корку и протянул Федьке. Мальчик ударил по руке, и корка упала. Сом уходил, в спину ему доносилось:

– Я тебе не падальщик! Тоже важность знаю! Бог тебя не простит! Ай! – Отмахивался он рукой. – Всех простит. И Федьку простит.

Сом двигался по крутому сухому склону, на котором не росло высокой травы. Дурная почва, шептал мельник, как моя голова. Поднимаясь, он смотрел на свои ноги – сколоченные палки – и радовался, что не чувствует их.

Наверху он остановился перед земной длиной и сощурил глаз: тут останется всё: его тень, его день, его труд, его жизнь. Широким навздошным шагом он утвердил тропу и вошёл в свой храм готовить хлеб.

На закате он вышел. Холм под вечер оседал, а ночью, возможно, и вовсе разглаживался. Он шёл домой без желания, его вело ожидание.

«Что бишь я хотел у неё спросить, думал мельник, вроде бы что-то про вчера, да уже сегодня кончается… Экая круговерть».

Хлебной корки у комля не валялось.

На середине моста он остановился посмотреть в тугую речную воду. И мечтал так: «Где-то теперь место, куда камень упал? Может, рыбак там ловит или бросает сети». А для чего бросает, уж не думал и шёл дальше.

Темнота спустилась на деревню, затеплились нутра домов. Девкин камень лежал на своём месте. И колодец всё так поднимал ручку вверх.

Из холодной кучи камней возле дома выбрал один и сунул в карман греть. Жена дверь отворила заране. Он протянул ей хлеб, поужинал несложно, чтобы забыть, и лёг. Послушал как жена молилась, губами шевелил. И уже засыпал, она спросила:

– Ну, чего?

– Чего?

– Ничего?

– Ничего.

– Ну, ничего – так ничего: утро вечера мудренее.`;
