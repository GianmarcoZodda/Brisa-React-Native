import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext';

//esta funcion la hago para crear un contenedor que envuelva todas las screens y le aplique de fondo el coplor correspondiente al modo oscuro o claro
const ThemeContainer = ({ children }) => {
  const theme = useAppTheme();

  return (//por cada children (screen), la envuelvo en ese color
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {React.Children.map(children, (child) => (
        <View style={styles.childContainer}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childContainer: {
    flex: 1, // Esto asegura que cada child se expanda si lo necesita
  },
});

export default ThemeContainer;