import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemeColors } from "./Constants";

const DoubleButton = ({ leftCommand, rightCommand }) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginTop: 50 }}>
            <TouchableOpacity style={styles.boxLeft} onPress={leftCommand}>
                <Text style={styles.txt}>İPTAL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxRight} onPress={rightCommand}>
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
        backgroundColor: '#D08D94',
        borderRadius: 10,
        borderWidth: .5,
        borderColor: 'darkgray',
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxRight: {
        height: 44,
        width: 163,
        backgroundColor: ThemeColors.transportList.SubHeaderBar,
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