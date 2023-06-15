import React, { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "react-native-splash-screen";
import Main from "./src/Main";

import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/roboto/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Main />
    </>
  );
}
