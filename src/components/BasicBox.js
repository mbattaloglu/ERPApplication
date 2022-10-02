import React from "react";
import { StyleSheet, View, Text } from "react-native";

const BasicBox = ({ listDatas }) => {
    return (
        <View style={{ borderRadius: 5, elevation: 3, marginBottom: '5%', backgroundColor: 'white', flex: .25 }}>
            {
                listDatas && Object.keys(listDatas).map((index) => {
                    return (
                        <Lines title={listDatas[index].title} value={listDatas[index].value} key={index} />
                    )
                })
            }
        </View>
    )
}

const Lines = ({ title, value }) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: .38 }}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={[styles.title, {paddingHorizontal: 0}]}>-</Text>
            </View>
            <View style={{ flex: .62, justifyContent: 'center' }}>
                <Text style={styles.value} numberOfLines={1}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        color: 'black',
        paddingHorizontal: '10%'
    },
    value: {
        fontSize: 13,
        color: '#3a5a40',
        textAlign: 'right',
        paddingHorizontal: '5%'
    },
})

export default BasicBox;