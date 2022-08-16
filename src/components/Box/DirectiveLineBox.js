import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

const ScreenWidth = Dimensions.get('window').width

const DirectineLineBox = ({ backColor, date, desc, directiveNo, unit, directiveAmount, paymentStatus }) => {
    return (
        <View style={{ alignItems: 'center', width: ScreenWidth }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: backColor }}>
                <View style={[styles.box, { borderLeftWidth: 0 }]}>
                    <Text style={styles.textStyle}>{date}</Text>
                </View>

                <View style={styles.box}>
                    <Text style={[styles.textStyle, {textAlign: 'right', paddingRight: 5}]}>{directiveNo}</Text>
                </View>
                <View style={[styles.box, { flex: 1.5 }]}>
                        
                    <Text style={[styles.textStyle, {textAlign: 'left', paddingLeft: 5}]}>{desc}</Text>
                </View>
                
                <View style={styles.box}>
                    <Text style={styles.textStyle}>{directiveAmount} {unit}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>{paymentStatus}</Text>
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
    },
    textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 9.5,
        color: 'black',
        height: 15,
    }
})


export default DirectineLineBox;