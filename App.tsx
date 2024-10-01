import { ProvedorEstadoGlobal } from "./src/hooks/EstadoGlobal";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/LoginScreen';
import CadastroScreen from './src/pages/CadastroScreen';
import ListaTarefas from './src/components/ListaTarefas';
import AdicionarTarefa from './src/components/AdicionarTarefa';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
            <Stack.Screen name="TarefasScreen" component={() => (
              <>
                <AdicionarTarefa />
                <ListaTarefas />
              </>
            )} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
}
