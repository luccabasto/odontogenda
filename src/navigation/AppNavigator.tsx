// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../pages/LoginScreen';
import CadastroScreen from '../pages/CadastroScreen';
import LocalScreen from '../pages/LocalScreen';
import DentistaScreen from '../pages/DentistaScreen';
import AgendamentoScreen from '../pages/AgendamentoScreen';

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Local: undefined;
  DentistaScreen: { region: string };
  AgendamentoScreen: { dentistId: number; dentistName: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Local" component={LocalScreen} options={{ title: 'Local' }} />
        <Stack.Screen name="DentistaScreen" component={DentistaScreen} options={{ title: 'Lista de Dentistas' }} />
        <Stack.Screen name="AgendamentoScreen" component={AgendamentoScreen} options={{ title: 'Agendamento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
