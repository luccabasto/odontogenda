import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const usuarios = await response.json();

      const usuarioValido = usuarios.find(
        (user: any) => user.username === username && user.password === password
      );

      if (usuarioValido) {
        navigation.navigate('Dentista'); // Navega para a tela de Dentistas
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      setError('Erro ao fazer login.');
    }
  };

  return (
    <View>
      <TextInput 
        placeholder="Nome de Usuário" 
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
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Cadastre-se" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
};

export default LoginScreen;
