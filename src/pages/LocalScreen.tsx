import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DentistaScreen: React.FC = () => {
  return (
    <View style={styles.container}>
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
  },
  button: {
    backgroundColor: '#007bff',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default DentistaScreen;
