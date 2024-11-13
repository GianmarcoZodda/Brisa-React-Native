import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, ScrollView } from 'react-native';
import { useTheme } from '../../utils/theme';
import EyeIcon from "../components/EyeIcon";
import strings from "../../utils/strings/strings";
import Icon from 'react-native-vector-icons/FontAwesome';
import Btn from '../../presentation/components/Btn';

const AboutUsScreen = () => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');


  const openSocialLink = (url) => {
    Linking.openURL(url);
  };

  const showModal = (text) => {
    setSelectedText(text);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSelectedText('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Logo y título con animación */}
      <View>
        <EyeIcon/>
        <Text style={[styles.title, { color: theme.primary }]}>{strings.abTitle}</Text>
      </View>

      {/* Sección: ¿Qué es BRISA? */}
      <Section
        title={strings.queEsBrisa}
        bodyText={[strings.queEsBrisaBody, strings.queEsBrisaBody1, strings.queEsBrisaBody2]}
        theme={theme}
        onShowMore={() => showModal(strings.queEsBrisaBody + '\n\n' + strings.queEsBrisaBody1 + '\n\n' + strings.queEsBrisaBody2)}
      />

      {/* Sección: ¿Quiénes Somos? */}
      <Section
        title={strings.quienesSomos}
        bodyText={[strings.quienesSomosBody, strings.quienesSomosBody1, strings.quienesSomosBody2]}
        theme={theme}
        onShowMore={() => showModal(strings.quienesSomosBody + '\n\n' + strings.quienesSomosBody1 + '\n\n' + strings.quienesSomosBody2)}
      />

      {/* Sección: Nuestra Misión */}
      <Section
        title={strings.nuestraMision}
        bodyText={[strings.nuestraMisionBody, strings.nuestraMisionBody1]}
        theme={theme}
        onShowMore={() => showModal(strings.nuestraMisionBody + '\n\n' + strings.nuestraMisionBody1)}
      />

      {/* Sección: Redes Sociales */}
      <View style={styles.section}>
      {/* Titulo y texto */}
      <Text style={[styles.sectionTitle, { color: theme.primary, textAlign: 'center' }]}>{strings.siguenosEnRedes}</Text>
      <Text style={[styles.sectionText, { color: theme.inverseBackground, marginBottom: 10 }]}>{strings.siguenosEnRedesBody}</Text>

      {/* Redes sociales con íconos */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity onPress={() => openSocialLink('https://twitter.com/BrisaIA')} style={styles.socialButton}>
          <Icon name="twitter" size={30} color={theme.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => openSocialLink('https://instagram.com/BrisaIAAA')} style={styles.socialButton}>
          <Icon name="instagram" size={30} color={theme.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => openSocialLink('https://linkedin.com/BrisaAI')} style={styles.socialButton}>
          <Icon name="linkedin" size={30} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionText, { color: theme.inverseBackground, marginTop: 10 }]}>{strings.siguenosEnRedesBody1}</Text>
    </View>

      {/* Sección: ¿Tienes un Problema o Comentario? */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary, textAlign: 'center' }]}>{strings.problemaComentario}</Text>
        <Text style={[styles.sectionText, { color: theme.inverseBackground, marginBottom: 30 }]}>{strings.problemaComentarioBody}</Text>
        <Btn onPress={() => openSocialLink('mailto:brisaiacontact@gmail.com')} 
        text={strings.contactanos}/>
      </View>

      {/* Sección: ¿Quieres unirte a nuestro equipo? */}
    <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary, textAlign: 'center' }]}>{strings.unirse}</Text>
        <Text style={[styles.sectionText, { color: theme.inverseBackground, marginBottom: 20 }]}>{strings.unirseBody}</Text>
        <Text style={[styles.sectionText, { color: theme.inverseBackground, marginBottom: 30 }]}>{strings.unirseBody1}</Text>
        <Btn onPress={() => openSocialLink('mailto:brisaiaworkwithus@gmail.com')} 
        text={strings.sumate}/>
    </View>

      {/* Modal para mostrar el contenido largo */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: theme.background}]}>
            <Text style={[styles.modalText, { color: theme.inverseBackground }]}>{selectedText}</Text>
            <TouchableOpacity onPress={hideModal} style={[styles.modalCloseButton, {backgroundColor: theme.primary}]}>
              <Text style={{color: theme.background}}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Componente de Sección con el botón "Leer completo"
const Section = ({ title, bodyText, theme, onShowMore }) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.primary, textAlign: 'center' }]}>{title}</Text>

      {bodyText.slice(0, 1).map((text, index) => (
        <Text key={index} style={[styles.sectionText, { color: theme.inverseBackground, marginBottom: 15 }]}>
          {text.includes("BRISA") ? <Text style={{ color: theme.inverseBackground }}>{text}</Text> : text}
        </Text>
      ))}

      {/* Botón "Leer completo" */}
      <TouchableOpacity onPress={onShowMore} style={styles.showMoreButton}>
        <Text style={[styles.showMoreButtonText, { color: theme.inverseBackground }]}>{strings.leerCompleto}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'transparent',
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  showMoreButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  showMoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  socialButton: {
    padding: 10,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    /*backgroundColor: 'white',*/
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalCloseButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  }
});

export default AboutUsScreen;
