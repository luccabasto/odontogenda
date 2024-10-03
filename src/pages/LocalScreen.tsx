import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LocalScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Seja bem-vindo ao agendamento OdontoPrev
      </Text>
      <Text style={styles.instructionsText}>
        Por favor, selecione abaixo o local desejado para agendar sua consulta!
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Zona Leste</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Zona Norte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Zona Oeste</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Zona Sul</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Centro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20, // Adicionando um pouco de padding
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    width: '100%', // Fazendo os botões ocuparem toda a largura disponível
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default LocalScreen;
