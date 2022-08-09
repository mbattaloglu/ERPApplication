import React from "react";

import { View, StyleSheet } from "react-native";
import { ShortLine } from "./Lines";

const TransportBox = ({ backColor, date, vehicleNo, company, oid, packing }) => {

    return (
        <View style={[styles.backBox, { backgroundColor: backColor }]}>
            <ShortLine title={"Araç No"} description={vehicleNo} flexBox={1} textColor={'black'} />
            <ShortLine title={"Firma"} description={company} flexBox={1} textColor={'black'} />
            <ShortLine title={"Fiş Numarası"} description={oid} flexBox={1} textColor={'black'} />
            <ShortLine title={"Tarih"} description={date} flexBox={1} textColor={'black'} />
            <ShortLine title={"Ambalaj"} description={packing} flexBox={1} textColor={'black'} />
        </View>
    )
}

const styles = StyleSheet.create({
    backBox: {
        height: 275,
        paddingHorizontal:8,
        backgroundColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        marginTop: 10
    }
})

export default TransportBox;