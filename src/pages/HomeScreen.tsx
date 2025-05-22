import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Container, 
    TitleScreen, 
    HomeLogo, 
    HomeViewer, 
    HomeButton, 
    TextButton 
} from '../styles';
import BlinkingSubTitle from '../components/SubTitleBlink';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Container>
      <HomeViewer>
        <HomeLogo source={require('./../../assets/homeScreen.png')} />
        <TitleScreen>OdontoGenda</TitleScreen>
        <BlinkingSubTitle />
      </HomeViewer>
      <HomeButton onPress={() => navigation.navigate('Login')}>
        <TextButton>Clique para fazer seu login</TextButton>
      </HomeButton>
    </Container>
  );
};

export default HomeScreen;