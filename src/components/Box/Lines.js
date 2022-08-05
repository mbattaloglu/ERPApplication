import React from "react";

import { View, Text, StyleSheet } from "react-native";

const ShortLine = ({ title, description, flexBox, textColor }) => {
    return (
        <View style={[{ flexDirection: 'row', marginVertical: 2.5, flex: flexBox ? flexBox : 0 }]}>
            <View style={styles.lineBox} >
                <Text style={[styles.lineText, {color: textColor}]}>{title}</Text>
            </View>
            <View style={[styles.lineBox, { width: 190 }]} >
                <Text style={[styles.lineText, {color: textColor}]}>{description}</Text>
            </View>
        </View>
    )
}

const LongLine = ({ title, description, flexBox, textColor }) => {
    return (
        <View style={[{ flexDirection: 'row', marginVertical: 2.5, flex: flexBox ? flexBox : 0 }]}>
            <View style={[styles.lineBox,]} >
                <Text style={[styles.lineText, {color: textColor}]}>{title}</Text>
            </View>
            <View style={[styles.lineBox, { width: 190}]} >
                <Text style={[styles.lineText, {color: textColor}]}>{description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lineBox: {
        borderWidth: 1,
        width: 120,
        justifyContent: 'center',
        paddingLeft: 5,
        backgroundColor: 'white',
    },
    lineText: {
        color: '#459E3C',
        fontSize: 15,
        fontWeight: '700',
    }
})

export { ShortLine, LongLine };