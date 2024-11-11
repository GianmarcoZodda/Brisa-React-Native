import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const RetinaCard = ({ miniatura, fecha, horario }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={miniatura} style={styles.imagen} resizeMode="contain" />
            <View>
                <Text style={styles.texto}>Fecha: {fecha}</Text>
                <Text style={styles.texto}>Hora: {horario}</Text>
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
    imagen: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginRight: 120,
    },
    texto: {
        color: '#ddd',
        fontSize: 20,
    },
});

export default RetinaCard;
