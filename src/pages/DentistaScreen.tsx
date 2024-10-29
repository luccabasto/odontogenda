import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Dentist {
  id: number;
  name: string;
  address: string;
  region: string;
  favorite: boolean;
}

const DentistaScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch('http://localhost:3000/dentists');
        const data: Dentist[] = await response.json();
        setDentists(data);
      } catch (error) {
        console.error("Erro ao buscar dentistas:", error);
      }
    };
    fetchDentists();
  }, []);

  const renderDentistItem = ({ item }: { item: Dentist }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('AgendamentoScreen', { dentistId: item.id, dentistName: item.name })}
      style={styles.dentistItem}
    >
      <View style={styles.dentistInfo}>
        <Text style={styles.dentistName}>{item.name}</Text>
        <Text style={styles.dentistAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dentists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDentistItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dentistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dentistInfo: {
    flex: 1,
    marginRight: 8,
  },
  dentistName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dentistAddress: {
    fontSize: 14,
    color: 'gray',
  },
});

export default DentistaScreen;
