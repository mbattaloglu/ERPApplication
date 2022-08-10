import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeColors } from "./Constants";

const TotalBox = ({ mainTop, mainMiddle, mainBottom }) => {
    return (
        <View style={{
            height: 130,
            backgroundColor: ThemeColors.HeaderBar,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 3,
            borderWidth: 2,
            marginHorizontal: 21
        }}>
            <LineBox main={mainTop[0]} desc={mainTop[1]} />
            <LineBox main={mainMiddle[0]} desc={mainMiddle[1]} />
            <LineBox main={mainBottom[0]} desc={mainBottom[1]} />
        </View>
    )
}

const LineBox = ({ main, desc }) => {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'orange',
            flex: 1,
            marginVertical: 3,
            marginHorizontal: 8
        }}>
            <View style={{ borderWidth: 1, justifyContent: 'center', paddingHorizontal: 5, flex: 1 }}>
                <Text style={[styles.textStyle, { textAlign: 'left' }]}>{main}</Text>
            </View>
            <View style={{ borderWidth: 1, justifyContent: 'center', paddingHorizontal: 5, flex: 2 }}>
                <Text style={styles.textStyle}>{desc}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        color: 'black',
        textAlign: 'right',
        fontWeight: '700'
    }
})

export default TotalBox;