import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemeColors } from "./Constants";

const DoubleButton = ({ leftCommand, rightCommand, type }) => {
    console.log(type)
    return (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginTop: 50 }}>
            <TouchableOpacity style={[styles.boxLeft, { backgroundColor: ThemeColors[type]?.SecondSubHeaderBar }]} onPress={leftCommand}>
                <Text style={styles.txt}>İPTAL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boxRight, { backgroundColor: ThemeColors[type]?.SubHeaderBar }]} onPress={rightCommand}>
                <Text style={styles.txt}>UYGULA</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    boxLeft: {
        marginRight: 1,
        height: 44,
        width: 163,
        borderRadius: 10,
        borderWidth: .5,
        borderColor: 'darkgray',
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxRight: {
        height: 44,
        width: 163,
        borderRadius: 10,
        borderWidth: .5,
        borderColor: 'darkgray',
        alignItems: 'center',
        justifyContent: 'center',

    },
    txt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    }
})

export default DoubleButton;