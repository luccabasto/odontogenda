// App.js
import React from "react";
import { UserProvider } from "./src/hooks/UserContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import { Text, View, ActivityIndicator } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    // Carrega a fontes que serão utilizadas no aplicativo
    Open_Sans: require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
    Open_Sans_Medium: require("./assets/fonts/Open_Sans/OpenSans-Medium.ttf"),
    Open_Sans_Light: require("./assets/fonts/Open_Sans/OpenSans-Light.ttf"),
  });

  if (!fontsLoaded) {
    // Exibe um indicador de carregamento enquanto a fonte não é carregada
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
