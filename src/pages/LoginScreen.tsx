import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
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
        navigation.navigate('Local'); 
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      setError('Erro ao fazer login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        placeholder="Nome de Usuário" 
        value={username} 
        onChangeText={setUsername} 
        style={styles.input}
      />
      <TextInput 
        placeholder="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <br/>
      <Button title="Cadastre-se" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
