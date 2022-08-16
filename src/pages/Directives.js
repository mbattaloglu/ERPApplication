import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import DirectivesBox from "../components/Box/DirectivesBox";
import { User, Api, ThemeColors } from "../components/Constants";
import TotalBox from "../components/TotalBox";
import { toAmount } from "../components/ConstFunctions";
import LineBox from "../components/Box/LineBox";
import DirectineLineBox from "../components/Box/DirectiveLineBox";

var i = 0;
// http://193.53.103.178:5312/api/odata/TransportPaymentDirectives/97209/GetCustomerTransportPaymentDirective(Date>'2022-01-01 00:00:00' & Date<'2022-01-31 23:59:59')
const Directives = () => {

    const [items, setItems] = useState([]);

    const GetData = () => {
        fetch(Api.link + '/odata/TransportPaymentDirectives?$filter=CustomerSupplier/Oid eq 97209 &$orderby=Date&$select=Date,Desc,Code,Amount,TPDPaymentStatus&$expand=CurrencyType($select=Name)&$top=10&$skip=' + i,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => setItems([...items, ...res.value]))
            .then(i = i + 10)
    }

    useEffect(() => {
        GetData();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {items.length > 0 ? (
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <HeaderLine />
                    <FlatList
                        data={items}
                        onEndReached={() => GetData()}
                        onEndReachedThreshold={3}
                        renderItem={({ item, index }) => (
                            <DirectineLineBox
                                date={item.Date.slice(0, 10)}
                                desc={item.Desc}
                                directiveNo={item.Code}
                                unit={item.CurrencyType.Name} // Manual !!!!!
                                directiveAmount={toAmount(item.Amount)}
                                paymentStatus={item.TPDPaymentStatus == 'Paid' ? 'Onaylı' : 'Onaysız'}
                                backColor={index % 2 == 0 ? '#FEFFFF' : '#F4F4F4'}
                            />
                        )}
                    />
                    <BottomLine />
                </View>
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Yükleniyor...</Text>
                </View>
            )}

        </View>
    )
}

const HeaderLine = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar }}>
                <View style={[styles.box, { borderLeftWidth: 0 }]}>
                    <Text style={styles.textStyle}>Tarih</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Talimat No</Text>
                </View>
                <View style={[styles.box, { flex: 1.5 }]}>
                    <Text style={styles.textStyle}>Açıklama</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Tutar</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Durum</Text>
                </View>
            </View>
        </View>
    )
}

const BottomLine = ({ totals }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar }}>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Onay Bekleyen</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Onaylanan</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Ödenen</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar }}>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, { color: 'white' }]}>{toAmount(totals?.Packing)}</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, { color: 'white' }]}>{toAmount(totals?.Weight)}</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5 }]}>
                    <Text style={[styles.textStyle, { color: 'white' }]}>{toAmount(totals?.Weight)}</Text>
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
        borderLeftWidth: .5
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        fontWeight: '600'
    }
})

export default Directives;