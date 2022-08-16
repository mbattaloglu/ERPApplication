import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import SuppliersBox from "../components/Box/SuppliersBox";
import TotalBox from "../components/TotalBox";
import { User, ThemeColors } from "../components/Constants";
import { toAmount } from "../components/ConstFunctions";
import SupplierLineBox from "../components/Box/SupplierLineBox";

var i = 0;

const CustomerSuppliers = ({ navigation }) => {

    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalBakiye, setTotalBakiye] = useState(0);

    const GetTotal = async () => {
        try {
            const list = await fetch('http://193.53.103.178:5312/api/odata/CustomerSuppliers?$expand=FinancialTrxs($select=Debit,Credit)&$select=FinancialTrxs', {
                method: 'GET', /* or POST/PUT/PATCH/DELETE */
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(res => res.value[0])
                .then(res => res.FinancialTrxs)
                .catch((err) => console.log("Hata: ", err));
            let l = list.length;
            let debit = 0;
            let credit = 0;
            for (let i = 0; i < l; i++) {
                debit += list[i].Debit;
                credit += list[i].Credit;
            }
            setTotalDebit(debit);
            setTotalCredit(credit);
            setTotalBakiye(debit - credit);
        } catch (e) {
            alert(e);
        }
    }

    const [items, setItems] = useState([]);

    const GetData = () => {
        fetch('http://193.53.103.178:5312/api/odata/CustomerSuppliers?$expand=DefaultCurrencyType($select=Name),FinancialTrxs($orderby=TrxDate;$select=TrxDate,LineDescription,SubType,Oid,Amount;$top=10;$skip=' + i + ')&$select=FinancialTrxs', {
            method: 'GET', /* or POST/PUT/PATCH/DELETE */
            headers: {
                'Authorization': 'Bearer ' + User.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => setItems([...items, ...res.value[0].FinancialTrxs]))
            .then(i = i + 10)
    }

    useEffect(() => {
        GetData();
        GetTotal();
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
                            <SupplierLineBox
                                date={item.TrxDate.slice(0, 10)}
                                desc={item.LineDescription.slice(0,18)}
                                subType={item.SubType}
                                oid={item.Oid}
                                currencyType={User.defaultCurrencyType}
                                amount={item.Amount}
                                backColor={index % 2 == 0 ? '#FEFFFF' : '#F4F4F4'}
                            />
                        )}
                    />
                    <BottomLine totalDebit={totalDebit} totalCredit={totalCredit} totalBakiye={totalBakiye}/>
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
                <View style={[styles.box, { flex: 1 }]}>
                    <Text style={styles.textStyle}>Tipi</Text>
                </View>
                <View style={[styles.box, , { flex: 1 }]}>
                    <Text style={styles.textStyle}>Açıklama</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Talimat No</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Tutar</Text>
                </View>
                <View style={[styles.box, {flex: .4}]}>
                    <Text style={styles.textStyle}>B/A</Text>
                </View>
            </View>
        </View>
    )
}

const BottomLine = ({ totalDebit, totalCredit, totalBakiye }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar, borderColor: 'gray' }}>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Borcu</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Alacağı</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Bakiye</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar, borderColor: 'gray' }}>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, { color: 'white' }]}>{toAmount(totalDebit)}</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, { color: 'white' }]}>{toAmount(totalCredit)}</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5 }]}>
                    <Text style={[styles.textStyle, { color: 'white' }]}>{toAmount(totalBakiye)}</Text>
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
        borderColor: 'gray' // Renk değiştir
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        fontWeight: '600'
    }
})

export default CustomerSuppliers;