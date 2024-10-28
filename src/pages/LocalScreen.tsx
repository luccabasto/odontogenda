import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importe o tipo de param list

const LocalScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToDentists = (selectedRegion: string) => {
    navigation.navigate('DentistaScreen', { region: selectedRegion });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Selecione uma região:</Text>
      <Button title="Zona Sul" onPress={() => navigateToDentists('Zona Sul')} />
      <Button title="Zona Norte" onPress={() => navigateToDentists('Zona Norte')} />
      <Button title="Zona Leste" onPress={() => navigateToDentists('Zona Leste')} />
      <Button title="Zona Oeste" onPress={() => navigateToDentists('Zona Oeste')} />
      <Button title="Centro" onPress={() => navigateToDentists('Centro')} />
    </View>
  );
};

export default LocalScreen;
