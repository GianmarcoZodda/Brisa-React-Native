import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../utils/theme';

const InfoCard = ({ title, body, navigation, targetScreen }) => {
    const theme = useTheme();

    return (
        <TouchableOpacity 
            style={[styles.card, { backgroundColor: theme.inverseBackground }]} 
            onPress={() => navigation.navigate(targetScreen)}
        >
            <Text style={[styles.cardTitle, { color: theme.primary }]}>{title}</Text>
            <Text style={[styles.cardBody, {color: theme.background}]}>{body}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: "95%"
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardBody: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default InfoCard;