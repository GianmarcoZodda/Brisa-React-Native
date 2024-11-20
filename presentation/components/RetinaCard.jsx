import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext'

const RetinaCard = ({ fecha, horario }) => {
    const theme = useAppTheme();
    return (
        <View style={styles.cardContainer}>
            <View>
                <Text style={[styles.texto, {color: theme.inverseBackground}]}>Fecha: {fecha}</Text>
                <Text style={[styles.texto, {color: theme.inverseBackground}]}>Hora: {horario}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    texto: {
        fontSize: 16,
    },
});

export default RetinaCard;
