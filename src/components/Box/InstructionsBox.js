import React from "react";

import { View, StyleSheet } from "react-native";
import { ShortLine } from "./Lines";

const InstructionsBox = ({backColor}) => {
    return (
        <View style={[styles.backBox, {backgroundColor: backColor }]}>
            <ShortLine title={"Tarih"} description={"05.05.2022"} flexBox={1} />
            <ShortLine title={"Açıklama"} description={"SALİH TEKSTİL ÖDEME"} flexBox={1} />
            <ShortLine title={"Talimat No"} description={"00001020020"} flexBox={1} />
            <ShortLine title={"Para Birimi"} description={"USD"} flexBox={1} />
            <ShortLine title={"Talimat Tutarı"} description={"15.000,09"} flexBox={1} />
            <ShortLine title={"Onay Durumu"} description={"Onaylı"} flexBox={1} />
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

export default InstructionsBox;