import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, VirtualizedList } from "react-native";
import { StylesAll } from "../Constants";

const FilterLine = ({ title, onchanged, icon, onTouch }) => {

    return (
        <View style={{ flexDirection: 'row', flex: 1, marginVertical: 4 }}>
            <View style={[styles.box, { flex: 1 }]}>
                <Text style={styles.textInBox}>{title}</Text>
            </View>

            {/* <View style={[styles.box, { flex: 1.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <TextInput style={[styles.textInBox, {flex: 1}]} onChangeText={val => onchanged(val)}></TextInput>
                <Image source={icon} style={[StylesAll.icon, {tintColor: 'gray'}]} />
            </View> */}
            <View style={[styles.box, { flex: 1.5 }]}>
                <TouchableOpacity onPress={() => onTouch()} style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }]}>
                    <Text style={[styles.textInBox, { flex: 1 }]}>P-02/22</Text>
                    <Image source={icon} style={[StylesAll.icon, { tintColor: 'gray' }]} />
                </TouchableOpacity>
                {/* <View>
                    <View style={{
                        height: 100,
                        width: 198,
                        backgroundColor: 'gray',
                        position: 'absolute',
                    }} />
                </View> */}
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
    },
    textInBox: {
        color: 'black',
        fontWeight: '700',
        fontSize: 15,
        paddingLeft: 2
    }
})

export default FilterLine;