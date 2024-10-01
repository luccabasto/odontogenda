import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (user: any) => user.username === username && user.password === password
      );

      if (!usuarioEncontrado) {
        setError('Erro de autenticação. Verifique suas credenciais.');
        return;
      }

      await AsyncStorage.setItem('token', 'some_token'); // O token pode ser gerado conforme necessário
      setError(null);
      navigation.navigate('TarefasScreen');
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('CadastroScreen'); // Navega para a tela de cadastro
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={handleRegister} style={{ color: 'blue', marginTop: 10 }}>
        Cadastre-se
      </Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
