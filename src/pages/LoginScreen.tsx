import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useUser } from '../hooks/UserContext';
import { Container, 
  LoginInput, 
  LoginErrorText, 
  TitleScreen, 
  LoginLogo, 
  LoginViewer, 
  SubTitle, 
  LoginInputViewer, 
  LoginButton, 
  RegisterButton,
  TextButton,
  TextRegister,
  HorizontalLine
} from '../styles';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const usuarios = await response.json();

      const usuarioValido = usuarios.find(
        (user: any) => user.username === username && user.password === password
      );

      if (usuarioValido) {
        setUser({ id: usuarioValido.id, nomeCompleto: usuarioValido.nomeCompleto });
        navigation.navigate('Local');
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      setError('Erro ao fazer login.');
    }
  };

  return (
    <Container>
      <LoginViewer>
        <LoginLogo source={require('./../../assets/homeScreen.png')} />
        <TitleScreen>OdontoGenda</TitleScreen>
        <SubTitle>Agendou, confirmou, sorriu!</SubTitle>
      </LoginViewer>
      <LoginInputViewer>
        <LoginInput 
        placeholder="Nome de Usuário" 
        value={username} 
        onChangeText={setUsername}
      />
        <LoginInput 
        placeholder="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
      />
        <LoginButton onPress={handleLogin}>
          <TextButton>Entrar</TextButton>
        </LoginButton>{error && <LoginErrorText>{error}</LoginErrorText>}
        <HorizontalLine />
        <RegisterButton onPress={() => navigation.navigate('Cadastro')}>
          <TextRegister>Cadastre-se</TextRegister>
        </RegisterButton>
        </LoginInputViewer>
    </Container>
  );
};

export default LoginScreen;
