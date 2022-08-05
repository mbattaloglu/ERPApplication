import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Icons } from "./Constants";

const MainButton = ({ title, color, command }) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center', marginBottom: 15 }} onPress={command}>
            <View style={[styles.box, { backgroundColor: color }]}>
                <Text style={styles.title}>{title}</Text>
                <Image source={Icons.click} style={{ height: 50, width: 50 }} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 360,
        height: 75,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderWidth: 1,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    }
})

export default MainButton;