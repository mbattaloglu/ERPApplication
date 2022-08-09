import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icons } from "../components/Constants";

const Filter = () => {

    let h = 70

    return (
        <View style={{ height: h + 20, backgroundColor: 'lightgray', marginHorizontal: 20, paddingVertical: 8, paddingHorizontal: 8 }}>
            <DateFilter />
        </View>
    )
}

const DateFilter = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', flex: 1, marginBottom: 4 }}>
                <View style={styles.box}>
                    <Text style={styles.textInBox}>Başlangıç Tarihi</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textInBox}>01.05.2022</Text>
                    <Image source={Icons.calenar}/>
                </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={styles.box}>
                    <Text style={styles.textInBox}>Bitiş Tarihi</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.textInBox}>01.05.2022</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    textInBox: {
        color: 'black',
        fontWeight: '700'
    }
})

export default Filter;