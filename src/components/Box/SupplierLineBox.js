import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { toAmount } from "../ConstFunctions";

const ScreenWidth = Dimensions.get('window').width

const SupplierLineBox = ({ backColor, oid, date, desc, amount, subType, currencyType }) => {

    const col = amount > 0 ? 'red' : '#459E3C'
    const d = amount > 0 ? 'A' : 'B'

    return (
        <View style={{ alignItems: 'center', width: ScreenWidth }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: backColor }}>

                <View style={[styles.box, { borderLeftWidth: 0 }]}>
                    <Text style={[styles.textStyle, {color: col}]}>{date}</Text>
                </View>

                <View style={[styles.box, { flex: 1}]}>
                    <Text style={[styles.textStyle, { color: col }]}>{subType}</Text>
                </View>
                <View style={[styles.box, { flex: 1}]}>
                    <Text style={[styles.textStyle, { textAlign: 'left', paddingRight: 5, color: col }]}>{desc}</Text>
                </View>

                <View style={styles.box}>
                    <Text style={[styles.textStyle, {color: col}]}>{oid}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={[styles.textStyle, {color: col}]}>{toAmount(Math.abs(amount))} {currencyType}</Text>
                </View>
                <View style={[styles.box, {flex: .4}]}>
                    <Text style={[styles.textStyle, {color: col}]}>{d}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 35,
        flex: 1,
        justifyContent: 'center',
        borderLeftWidth: .5,
        borderColor:'gray'
    },
    textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 9.5,
        height: 15,
    }
})


export default SupplierLineBox;