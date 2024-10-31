import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import logoTransp from '../../assets/logoTransparente.png';
import Btn from '../../presentation/components/Btn';
import { useNavigation } from '@react-navigation/native';
import strings from '../../utils/strings/strings';
import logoutIcon from '../../assets/logout.png';
import RetinaCard from '../components/RetinaCard';
import retina1 from '../../assets/retina1.jpg';
import retina2 from '../../assets/retina2.jpg';
import retina3 from '../../assets/retina3.jpg';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const subirImagen = () => {
    navigation.navigate("Login");
  };

  const handleLogout = () => {
    console.log('Logica Logout');
  };

  const miniCards = [
    { id: '1', miniatura: retina1 },
    { id: '2', miniatura: retina2 },
    { id: '3', miniatura: retina3 },
  ];

  return (
    <View style={styles.container}>
      <Image 
        source={logoTransp} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <FlatList
        data={miniCards}
        renderItem={({ item }) => (
          <RetinaCard miniatura={item.miniatura} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonContainer}>
        <Btn 
          text={strings.subirImagen}
          onPress={subirImagen} 
          style={styles.button} 
        />
        <TouchableOpacity onPress={handleLogout}>
          <Image 
            source={logoutIcon} 
            style={styles.logoutIcon} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  logo: {
    width: 88,
    height: 88,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
  },
  logoutIcon: {
    width: 40, 
    height: 40, 
    marginLeft: 10, 
  },
});

export default ProfileScreen;
