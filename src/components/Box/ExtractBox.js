import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ShortLine, LongLine } from "./Lines";

const ExtranctBox = ({backColor, isDebt}) => {

    const col = isDebt ? 'red' :  '#459E3C'
    const txt = isDebt ? 'Borç' : 'Alacak'

    return (
        <View>
            <View style={[styles.backBox, {backgroundColor: backColor}]}>
                <ShortLine title={'Tarih'} description={'01.05.2022'} flexBox={1} textColor={col}/>
                <LongLine title={'Açıklama'} description={'KSTM-OTM-TH'} flexBox={2} textColor={col}/>
                <ShortLine title={'Tipi'} description={'Tahsilat'} flexBox={1} textColor={col}/>
                <ShortLine title={'Talimat No'} description={'310900'} flexBox={1} textColor={col}/>
                <ShortLine title={'Parabirimi'} description={'USD'} flexBox={1} textColor={col}/>
                <ShortLine title={txt} description={'12'} flexBox={1} textColor={col}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backBox: {
        height: 348,
        width: 332,
        backgroundColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 5,
    }
})

export default ExtranctBox;