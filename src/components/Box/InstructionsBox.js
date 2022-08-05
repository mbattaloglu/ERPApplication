import React from "react";

import { View, StyleSheet } from "react-native";
import { ShortLine } from "./Lines";

const InstructionsBox = ({backColor}) => {
    
    return (
        <View style={[styles.backBox, {backgroundColor: backColor }]}>
            <ShortLine title={"Tarih"} description={"05.05.2022"} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Açıklama"} description={"SALİH TEKSTİL ÖDEME"} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Talimat No"} description={"00001020020"} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Para Birimi"} description={"USD"} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Talimat Tutarı"} description={"15.000,09"} flexBox={1} textColor={'black'} textAlign={'right'}/>
            <ShortLine title={"Onay Durumu"} description={"Onaylı"} flexBox={1} textColor={'black'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    backBox: {
        height: 251,
        width: 332,
        backgroundColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 5,
    }
})

export default InstructionsBox;