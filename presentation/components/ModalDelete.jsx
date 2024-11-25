import React from 'react';
import { useAppTheme } from '../../data/ThemeContext';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import strings from '../../utils/strings/strings';

const ModalDelete = ({ isVisible, onClose, onDelete }) => {
  const theme = useAppTheme();

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>

      <View style={styles.overlay}>
        
        <View style={[styles.container, { backgroundColor: theme.background }]}>

          <Text style={[styles.title, { color: theme.inverseBackground }]}>
            {strings.seguroEliminar}
          </Text>

          <View style={styles.btnContainer}>
           
            <TouchableOpacity style={[styles.yesButton, {backgroundColor: theme.buttonRed}]} onPress={onDelete}>
              <Text style={[styles.btnText, {color: theme.inverseBackground}]}>{strings.ELIMINAR}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.noButton, {backgroundColor: theme.primary}]} onPress={onClose}>
              <Text style={[styles.btnText, {color: theme.inverseBackground}]}>{strings.CERRAR}</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', //un fondo oscuro medio transparent/difuminado
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, //este y el de abajo son como unas sombras, me lo dijo chat
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  yesButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  noButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalDelete;
