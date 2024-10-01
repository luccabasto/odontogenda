import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa o provedor de estado global
import { ProvedorEstadoGlobal } from "./src/hooks/EstadoGlobal";
// Importa a tela de Login
import LoginScreen from "./src/pages/LoginScreen"; // Altere para o caminho correto
// Importa o componente ListaTarefas
import ListaTarefas from "./src/components/ListaTarefas";
import { NativeBaseProvider } from "native-base";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="TarefasScreen" component={ListaTarefas} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
}
