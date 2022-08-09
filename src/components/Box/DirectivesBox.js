import React from "react";

import { View, StyleSheet } from "react-native";
import { ShortLine } from "./Lines";

const DirectivesBox = ({backColor, date, desc, directiveNo, unit, directiveAmount, paymentStatus}) => {

    return (
        <View style={[styles.backBox, {backgroundColor: backColor }]}>
            <ShortLine title={"Tarih"} description={date} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Açıklama"} description={desc} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Talimat No"} description={directiveNo} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Para Birimi"} description={unit} flexBox={1} textColor={'black'}/>
            <ShortLine title={"Talimat Tutarı"} description={directiveAmount} flexBox={1} textColor={'black'} textAlign={'right'}/>
            <ShortLine title={"Onay Durumu"} description={paymentStatus} flexBox={1} textColor={'black'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    backBox: {
        height: 275,
        width: 350,
        backgroundColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 5,
        marginTop:10
    }
})

export default DirectivesBox;