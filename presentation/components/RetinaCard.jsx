import React from 'react';
import { Image, StyleSheet, ImageBackground } from 'react-native';

const RetinaCard = ({ miniatura }) => {
    return (
        <ImageBackground source={miniatura} style={estilos.card}>
            <Image
                source={miniatura}
                style={estilos.imagen}
                resizeMode='contain'
            />
        </ImageBackground>
    );
}

const estilos = StyleSheet.create({
    imagen: {
        width: '100%',
        height: 200,
        marginBottom: 10
    },
    card: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        marginBottom: 10,
        width: 340,
        height: 320,
        overflow: "hidden",
        marginTop: 20
    }
});

export default RetinaCard;
