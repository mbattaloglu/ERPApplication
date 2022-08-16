import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

const ScreenWidth = Dimensions.get('window').width

const LineBox = ({ backColor, date, vehicleNo, company, oid, packing }) => {
    return (
        <View style={{ alignItems: 'center', width: ScreenWidth }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: backColor }}>
                <View style={[styles.box, { borderLeftWidth: 0 }]}>
                    <Text style={styles.textStyle}>{date}</Text>
                </View>

                <View style={[styles.box, { flex: 2 }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 5}}>
                        <Text style={styles.textStyle}>{company}</Text>
                    </ScrollView>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>{oid}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>{vehicleNo}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>{packing}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 30,
        flex: 1,
        justifyContent: 'center',
        borderLeftWidth: .5,
    },
    textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 10.5,
        color: 'black',
    }
})


export default LineBox;