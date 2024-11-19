import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../utils/theme';
import { useAuth } from '../../data/AuthContext';
import InfoCard from "../components/InfoCard"; // Importamos el nuevo componente
import Btn from "../components/Btn";
import { useNavigation } from '@react-navigation/native';
import strings from '../../utils/strings/strings';

const HomeScreen = () => {
    const theme = useTheme();
    const { logout, user, deleteAccount } = useAuth(); //me agarro los datos del user
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={[styles.title, { color: theme.primary }]}>
            ¡Bienvenido a BRISA{user ? `, ${user.username}` : '!'}!
            </Text>
            <Text style={[styles.subtitle, { color: theme.inverseBackground }]}>
                {strings.subtitle}
            </Text>

            {/* aca le puedo meter toda la info que quiera del user, como una foto (si se la agrego al back) */}
            {user && ( 
                <InfoCard 
                title={strings.infoCard1} 
                body={`Nombre: ${user.username}\nCorreo: ${user.email}`}
                navigation={navigation} 
                targetScreen="Profile" 
                />
            )}

            <InfoCard 
                title={strings.infoCard2}
                body={strings.infoCard2Body}
                navigation={navigation} 
                targetScreen="SubirImagen" 
            />
            <InfoCard 
                title={strings.infoCard3}
                body={strings.infoCard3Body}
                navigation={navigation} 
                targetScreen="About" 
            />
            <InfoCard 
                title={strings.infoCard4}
                body={strings.infoCard4Body}
                navigation={navigation} 
                targetScreen="Settings" 
            />

            <Btn
                onPress={() => logout(navigation)} 
                text="Cerrar Sesión"
                backgroundColor={theme.secondary}
            />

            <Btn
                onPress={() => deleteAccount(navigation)} 
                text="Eliminar Cuenta"
                backgroundColor={theme.buttonRed}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingBottom: 100,
        marginTop: 30,
        alignItems: "center"
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    infoSection: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default HomeScreen;
