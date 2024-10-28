import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

interface Dentist {
  id: number;
  name: string;
  address: string;
  region: string;
  favorite: boolean;
}

type RootStackParamList = {
  DentistaScreen: { region: string };
};

const DentistaScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DentistaScreen'>>();
  const { region } = route.params;

  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch('http://localhost:3000/dentists');
        const data: Dentist[] = await response.json();
        const filteredDentists = data.filter(dentist => dentist.region === region);
        setDentists(sortDentists(filteredDentists));
      } catch (error) {
        console.error("Erro ao buscar dentistas:", error);
      }
    };

    fetchDentists();
  }, [region]);

  const sortDentists = (dentistList: Dentist[]): Dentist[] => {
    return [...dentistList].sort((a, b) => Number(b.favorite) - Number(a.favorite));
  };

  const handleToggleFavorite = async (dentistId: number, currentFavoriteStatus: boolean) => {
    try {
      const updatedDentists = dentists.map(dentist =>
        dentist.id === dentistId ? { ...dentist, favorite: !currentFavoriteStatus } : dentist
      );
      setDentists(sortDentists(updatedDentists));

      await fetch(`http://localhost:3000/dentists/${dentistId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: !currentFavoriteStatus }),
      });
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const renderDentistItem = ({ item }: { item: Dentist }) => (
    <View style={styles.dentistItem}>
      <View style={styles.dentistInfo}>
        <Text style={styles.dentistName}>{item.name}</Text>
        <Text style={styles.dentistAddress}>{item.address}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Button
          title={item.favorite ? 'Remover Favorito' : 'Favoritar'}
          onPress={() => handleToggleFavorite(item.id, item.favorite)}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.regionText}>
        Dentistas disponíveis na região: <Text style={styles.regionName}>{region}</Text>
      </Text>
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
  regionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  regionName: {
    fontWeight: 'bold',
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
  favoriteButton: {
    paddingHorizontal: 8,
  },
});

export default DentistaScreen;
