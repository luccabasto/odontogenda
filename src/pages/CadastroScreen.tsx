import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Define a interface para um usuário
interface Usuario {
  id: string;
  nomeCompleto: string;
  username: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  password: string;
  telefone: string; // Adicionado o campo telefone
}

const CadastroScreen: React.FC = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState(''); // Novo estado para telefone
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    // Verificação do CPF (11 dígitos)
    if (cpf.length !== 11) {
      setError('O CPF deve ter 11 dígitos.');
      return;
    }

    // Verificação do telefone (formato (00) 99999-0000)
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      setError('O telefone deve estar no formato (00) 99999-0000.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const usuarios: Usuario[] = await response.json(); // Define o tipo para o retorno da API

      // Verificar se já existe um usuário com o mesmo username, CPF ou email
      const usuarioExistente = usuarios.find((user: Usuario) =>
        user.username === username || user.cpf === cpf || user.email === email
      );

      if (usuarioExistente) {
        setError('Usuário já existe.');
        return;
      }

      // Criar um novo usuário
      const novoUsuario: Usuario = {
        id: Date.now().toString(),
        nomeCompleto,
        username,
        cpf,
        dataNascimento,
        email,
        password: senha,
        telefone, // Adicionando o telefone ao novo usuário
      };

      // Salvar o novo usuário no db.json
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      alert('Cadastro realizado com sucesso!');
      navigation.navigate('LoginScreen'); // Retorna para a tela de login
    } catch (error) {
      setError('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nome Completo"
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="CPF (11 dígitos)"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric" // Define o teclado como numérico
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Data de Nascimento (YYYY-MM-DD)"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Telefone (00) 99999-0000"
        value={telefone}
        onChangeText={setTelefone}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default CadastroScreen;
