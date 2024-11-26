import React from 'react';
import { useAppTheme } from '../../data/ThemeContext';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import strings from '../../utils/strings/strings';

const ModalAnalisis = ({ isVisible, onClose, resultado}) => {
  const theme = useAppTheme();

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          
          <Text style={[styles.title, { color: theme.inverseBackground }]}>
            {strings.resAnalisis}
          </Text>

          {/* Fecha y hora */}
          <View style={styles.infoContainer}>
            <Text style={[styles.label, { color: theme.inverseBackground }]}>Fecha:</Text>
            <Text style={[styles.value, { color: theme.primary }]}>{resultado?.fecha || "No disponible"}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.label, { color: theme.inverseBackground }]}>Hora:</Text>
            <Text style={[styles.value, { color: theme.primary }]}>{resultado?.horario || "No disponible"}</Text>
          </View>

         
          <View style={styles.analysisContainer}>
            {resultado.analysis?.map((item, index) => (
              item != "NO_DR" && (
                <Text key={index} style={[styles.analysisText, { color: theme.inverseBackground }]}>
                {item}
              </Text>
              )
              
            ))}
          </View>
     
          {/* Botón de cerrar */}
          <TouchableOpacity style={[styles.closeButton, { backgroundColor: theme.primary }]} onPress={onClose}>
            <Text style={[styles.closeButtonText, { color: theme.inverseBackground }]}>{strings.CERRAR}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '85%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  analysisContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  analysisText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalAnalisis;
