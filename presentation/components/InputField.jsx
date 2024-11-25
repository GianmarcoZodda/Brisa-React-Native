import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const InputField = ({ value, onValueChange, label, isPassword = false , error}) => {
  const theme = useAppTheme();
  const [showPassword, setShowPassword] = useState(false); 
  const [isLocked, setIsLocked] = useState(true); 

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.inverseBackground }]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: theme.primary }]}
          value={value}
          onChangeText={onValueChange}
          secureTextEntry={isPassword && !showPassword} 
        />
        {isPassword && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword); 
            setIsLocked(!isLocked)}
          } style={styles.eyeButton}>
            <Ionicons name={isLocked ? 'lock-closed' : 'lock-open'}  size={24} color={theme.inverseBackground}/>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    width: '90%',
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative', 
    flexDirection: 'row', 
  },
  input: {
    flex: 1, 
    height: 40,
    borderColor: '#41C1BA',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  eyeButton: {
    position: 'absolute', 
    right: 10, 
    top: 5, 
    padding: 5, 
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,  
  },
});

export default InputField