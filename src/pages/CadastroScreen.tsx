import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// Define a interface para um usuário
interface Usuario {
  id: string;
  nomeCompleto: string;
  username: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  password: string;
}

const CadastroScreen: React.FC = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState(''); // DD/MM/YYYY no front-end
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState(''); // Novo campo de telefone
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    // Verificação de formato de data
    const dataNascimentoParts = dataNascimento.split("/");
    const dia = parseInt(dataNascimentoParts[0], 10);
    const mes = parseInt(dataNascimentoParts[1], 10);
    const ano = parseInt(dataNascimentoParts[2], 10);

    if (
      isNaN(dia) || isNaN(mes) || isNaN(ano) ||
      dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano.toString().length !== 4
    ) {
      setError("Data de nascimento inválida. Utilize o formato DD/MM/YYYY.");
      return;
    }

    // Converter para o formato YYYY-MM-DD para envio ao JSON
    const dataNascimentoFormatada = `${ano}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`;

    // Validação do CPF
    if (!/^\d{11}$/.test(cpf)) {
      setError("CPF inválido. Deve conter exatamente 11 dígitos.");
      return;
    }

    // Validação do E-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("E-mail inválido. Verifique o formato.");
      return;
    }

    // Validação do Telefone
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
      setError("Telefone inválido. Utilize o formato (NN) NNNNN-NNNN.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const usuarios: Usuario[] = await response.json();

      // Verificar se já existe um usuário com o mesmo username, CPF ou email
      const usuarioExistente = usuarios.find(
        (user: Usuario) => user.username === username || user.cpf === cpf || user.email === email
      );

      if (usuarioExistente) {
        setError("Usuário já existe.");
        return;
      }

      // Criar um novo usuário
      const novoUsuario: Usuario = {
        id: Date.now().toString(),
        nomeCompleto,
        username,
        cpf,
        dataNascimento: dataNascimentoFormatada, // Salva no formato correto
        email,
        telefone, // Adiciona o telefone
        password: senha,
      };

      // Salvar o novo usuário no db.json
      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login"); // Volta para a tela de Login após o cadastro
    } catch (error) {
      setError("Erro ao cadastrar. Verifique os dados.");
    }
  };

  // Função para formatar o telefone
  const handleTelefoneChange = (text: string) => {
    const apenasNumeros = text.replace(/\D/g, '');
    const ddd = apenasNumeros.slice(0, 2);
    const parte1 = apenasNumeros.slice(2, 7);
    const parte2 = apenasNumeros.slice(7, 11);
    let telefoneFormatado = '';

    if (ddd) telefoneFormatado += `(${ddd}) `;
    if (parte1) telefoneFormatado += parte1;
    if (parte2) telefoneFormatado += `-${parte2}`;

    setTelefone(telefoneFormatado);
  };

  // Função para formatar a data
  const handleDataNascimentoChange = (text: string) => {
    // Remove todos os caracteres que não sejam dígitos
    const apenasNumeros = text.replace(/\D/g, '');
    const dia = apenasNumeros.slice(0, 2);
    const mes = apenasNumeros.slice(2, 4);
    const ano = apenasNumeros.slice(4, 8);
    let dataFormatada = '';

    // Adiciona a formatação automática
    if (dia) dataFormatada += dia;
    if (mes) dataFormatada += `/${mes}`;
    if (ano) dataFormatada += `/${ano}`;

    setDataNascimento(dataFormatada);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome Completo"
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="CPF (Somente números)"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={styles.input}
        maxLength={11} // Limita para 11 dígitos
      />
      <TextInput
        placeholder="Data de Nascimento (DD/MM/YYYY)"
        value={dataNascimento}
        onChangeText={handleDataNascimentoChange}
        style={styles.input}
        keyboardType="numeric"
        maxLength={10} // Limita para o formato DD/MM/YYYY
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Telefone (NN) NNNNN-NNNN"
        value={telefone}
        onChangeText={handleTelefoneChange}
        style={styles.input}
        keyboardType="numeric"
        maxLength={15} // Limita para o formato (NN) NNNNN-NNNN
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default CadastroScreen;
