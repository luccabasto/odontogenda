import React from "react";
import { ProvedorEstadoGlobal } from "./src/hooks/EstadoGlobal";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <AppNavigator /> {/* Navegador para gerenciar as rotas */}
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
}
