import { keyboardSettings } from "@/types/keyboardSetting";
import { Preferences } from "@capacitor/preferences";

export const setKeyboardSettings = async (settings: keyboardSettings) => {
  await Preferences.set({
    key: "keyboard",
    value: JSON.stringify(settings),
  });
};

const defaultValue = {
  height: 100,
  width: 100,
  position: "center",
};

export const getKeyboardSettings = async (): Promise<keyboardSettings> => {
  const jsonResponse = await Preferences.get({
    key: "keyboard",
  });
  if (jsonResponse.value) {
    return JSON.parse(jsonResponse.value);
  } else {
    setKeyboardSettings(defaultValue as keyboardSettings);
    return defaultValue as keyboardSettings;
  }
};
