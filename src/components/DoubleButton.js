import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const DoubleButton = ({leftCommand, rightCommand}) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent:'center' }}>
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
        marginRight: 10,
        height: 48,
        width: 170,
        backgroundColor: '#878787',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxRight: {
        height: 48,
        width: 170,
        backgroundColor: '#E93535',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    txt: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
    }
})

export default DoubleButton;