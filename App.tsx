// App.js
import React from "react";
import { UserProvider } from "./src/hooks/UserContext"; // Importa o UserProvider
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
