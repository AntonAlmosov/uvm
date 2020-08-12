import moment from "moment";
import "moment/locale/ru";
import { FontSize } from "../model/settings-state";
import { Fonts } from "./app-styles";

export const calculateTime = () => {
  moment.locale("ru");
  const date = moment().endOf("day").fromNow(true);
  return date;
};

export const getFontSizeIndex = (size: FontSize) => {
  switch (size) {
    case FontSize.Smallest:
      return 0;
    case FontSize.Small:
      return 1;
    case FontSize.Default:
      return 2;
    case FontSize.Big:
      return 3;
    case FontSize.Biggest:
      return 4;
  }
};

export const getFontSizeType = (size: number) => {
  switch (size) {
    case 0:
      return FontSize.Smallest;
    case 1:
      return FontSize.Small;
    case 2:
      return FontSize.Default;
    case 3:
      return FontSize.Big;
    case 4:
      return FontSize.Biggest;
  }
  return FontSize.Default;
};

export const getFontFamilyName = (fontFamily: Fonts) => {
  switch (fontFamily) {
    case Fonts.SFProRegular:
      return "San Fracisco";
    case Fonts.InterRegular:
      return "Inter";
    case Fonts.NewYorkRegular:
      return "New York";
    case Fonts.LoraRegular:
      return "Lora";
    case Fonts.SpectralRegular:
      return "Spectral";
  }
  return "San Francisco";
};
