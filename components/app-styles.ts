import { Dimensions } from "react-native";

export const Fonts = {
  NewYorkRegular: "NewYorkMedium-Regular",
  NewYorkSemibold: "NewYorkMedium-Semibold",
  SFProRegular: "SFProText-Regular",
  SFProRegularItalic: "SFProText-RegularItalic",
  SFProSemibold: "SFProText-Semibold",
};

export const AppStyles = {
  text: {
    heading1: {
      fontFamily: Fonts.NewYorkRegular,
      fontSize: 38,
      lineHeight: 45,
      fontWeight: "400" as "400",
    },
    heading2: {
      fontFamily: Fonts.NewYorkRegular,
      fontSize: 28,
      lineHeight: 33,
      fontWeight: "400" as "400",
    },
    heading3: {
      fontFamily: Fonts.NewYorkSemibold,
      fontSize: 17,
      lineHeight: 20,
      fontWeight: "600" as "600",
    },
    heading4: {
      fontFamily: Fonts.NewYorkRegular,
      fontSize: 17,
      lineHeight: 20,
      fontWeight: "400" as "400",
    },
    text: {
      fontFamily: Fonts.SFProRegular,
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "400" as "400",
    },
    quote: {
      fontFamily: Fonts.SFProRegularItalic,
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "400" as "400",
    },
    quoteCaption: {
      fontFamily: Fonts.SFProRegular,
      fontSize: 15,
      lineHeight: 24,
      fontWeight: "400" as "400",
    },
    giantLabel: {
      fontFamily: Fonts.SFProSemibold,
      fontSize: 30,
      lineHeight: 30,
      fontWeight: "600" as "600",
    },
    smallLabel: {
      fontFamily: Fonts.SFProSemibold,
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "600" as "600",
    },
  },
  shadows: {
    general: {
      shadowColor: "#000",
      shadowOpacity: 0.07,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 20,
    },
  },
  screenWidth: Dimensions.get("window").width - 32,
  screenPadding: 16,
};
