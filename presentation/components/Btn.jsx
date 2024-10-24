import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext'


const Btn = ({ onPress, text, style }) => {
    const theme = useAppTheme(); // accedo al theme (colores)
  
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }, style]}
        onPress={onPress}>

        <Text style={[styles.text, { color: theme.background }]}>{text}</Text>

        </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      width: '90%',
      marginBottom: 30,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 16,
    },
  });
  
  export default Btn;