import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ShortLine, LongLine } from "./Lines";
import { toAmount } from "../ConstFunctions";

const SuppliersBox = ({ backColor, oid, date, desc, amount, subType, currencyType }) => {

    const col = amount > 0 ? 'red' : '#459E3C'
    const txt = amount > 0 ? 'Borç' : 'Alacak'

    return (
        <View>
            <View style={[styles.backBox, { backgroundColor: backColor }]}>
                <ShortLine title={'Tarih'} description={date} flexBox={1} textColor={col} />
                <ShortLine title={'Açıklama'} description={desc} flexBox={2} textColor={col} />
                <ShortLine title={'Tipi'} description={subType} flexBox={1} textColor={col} />
                <ShortLine title={'Talimat No'} description={oid} flexBox={1} textColor={col} />
                <ShortLine title={'Parabirimi'} description={currencyType} flexBox={1} textColor={col} />
                <ShortLine title={txt} description={toAmount(Math.abs(amount))} flexBox={1} textColor={col} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backBox: {
        height: 348,
        width: 350,
        backgroundColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        marginTop: 10
    }
})

export default SuppliersBox;