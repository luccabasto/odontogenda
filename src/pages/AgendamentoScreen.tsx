import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUser } from '../hooks/UserContext'; 

type AgendamentoScreenRouteProp = RouteProp<RootStackParamList, 'AgendamentoScreen'>;

const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
const horarios = ['10:30'];

{/* '11:00','11:30','13:30','14:00','14:30','15:00','15:30','16:00','16:30' */}

const AgendamentoScreen: React.FC = () => {
  const route = useRoute<AgendamentoScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { dentistName } = route.params;
  const { user } = useUser(); // Pega os dados do usuário logado do contexto

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  // Função para confirmar o agendamento e enviar para a API
  const handleConfirm = async () => {
    if (selectedDay && selectedHorario && user) {
      const agendamento = {
        id: Date.now().toString(), // Gera um ID único para o agendamento
        nomeCompleto: user.nomeCompleto, // Nome completo do usuário logado
        horario: `${selectedDay} às ${selectedHorario}`, // Combinação do dia e horário selecionado
        name: dentistName, // Nome do dentista da consulta
      };

      try {
        // Envia o agendamento para o endpoint agendamentos no db.json
        await fetch("http://localhost:3000/agendamentos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agendamento),
        });

        setConfirmationMessage(`Consulta confirmada para ${selectedDay} às ${selectedHorario}.`);

      
        setTimeout(() => {
          navigation.navigate('Local');
        }, 3000);
      } catch (error) {
        console.error("Erro ao enviar o agendamento:", error);
        setConfirmationMessage("Erro ao confirmar a consulta. Tente novamente.");
      }
    } else {
      setConfirmationMessage("Por favor, selecione um dia e horário.");
    }
  };

  // Função para cancelar o agendamento e limpar as seleções
  const handleCancel = () => {
    setSelectedDay(null);
    setSelectedHorario(null);
    setConfirmationMessage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dra. {dentistName}</Text>

      {/* Exibição dos dias da semana */}
      {daysOfWeek.map((day) => (
        <TouchableOpacity
          key={day}
          style={[styles.dayButton, selectedDay === day && styles.selectedButton]}
          onPress={() => setSelectedDay(selectedDay === day ? null : day)}
        >
          <Text style={styles.dayText}>{day}</Text>
          {/* Exibe os horários se o dia for selecionado */}
          {selectedDay === day && (
            <View>
              {horarios.map((hora) => (
                <TouchableOpacity 
                  key={hora} 
                  onPress={() => setSelectedHorario(hora)} 
                  style={[styles.horarioButton, selectedHorario === hora && styles.selectedHorarioButton]}
                >
                  <Text style={styles.horarioText}>{hora}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* Exibição da mensagem de confirmação, se houver */}
      {confirmationMessage && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>{confirmationMessage}</Text>
        </View>
      )}

      {/* Botões de confirmar e cancelar */}
      <View style={styles.buttonsContainer}>
        <Button title="Confirmar" onPress={handleConfirm} color="#333" />
        <Button title="Cancelar" onPress={handleCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  dayButton: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: '#ccc',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  horarioButton: {
    padding: 8,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 4,
  },
  selectedHorarioButton: {
    backgroundColor: '#ddd',
  },
  horarioText: {
    fontSize: 14,
    textAlign: 'center',
  },
  confirmationContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#e0ffe0',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 16,
    color: '#006400',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default AgendamentoScreen;
