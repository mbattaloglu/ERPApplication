import React, { useEffect, useMemo, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TransportBox from "../components/Box/TransportBox";
import { User, Api, Icons, ThemeColors } from "../components/Constants";
import TotalBox from "../components/TotalBox";
import Filter from "./Filter";
import { TransportContext } from "../../Context";
import { toAmount } from "../components/ConstFunctions";
import LineBox from "../components/Box/LineBox";

var i = 0;
var v = false;


const filtersTitle = [
    startDate = 'DocumentDate ge ',
    endDate = 'DocumentDate le ',
    vehicle = "TransportWaybill/declarationNumber eq ",
    company = "SenderName eq "
]


const filtersList2 = [
    startDate = 'DocumentDate ge 2020-01-01',
    endDate = 'DocumentDate le 2022-12-30',
    vehicle = "TransportWaybill/declarationNumber eq 'P-02/22'",
    company = "SenderName eq 'SONER ATAKUL ( USD )'"
]

const TransportList = ({ navigation }) => {

    const asd = null;

    const GetTotal = () => {
        fetch('http://193.53.103.178:5312/api/odata/TransportCards?$apply=aggregate(TotalPackingQuantity with sum as Packing, TotalWeight with sum as Weight)',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => setTotals(...res.value))
    }

    const [edit, setEdit] = useState(false);
    const [items, setItems] = useState([]);
    const [totals, setTotals] = useState("");

    const fff = false;

    const [expand, setExpand] = useState('');

    function Filters(list) {
        console.log(list)
        let all = '&$filter=';
        let l = list.length;
        var first = true;
        for (let i = 0; i < l; i++) {
            if (list[i] != '') {
                if (first) {
                    all += filtersTitle[i] + list[i];
                    first = false;
                }
                else {
                    all += ' and ' + filtersTitle[i] + list[i];
                }
            }
        }
        return all;
    }

    function doFilter(list) {
        i = 0;
        console.log("asda: ", list)
        setExpand(Filters(list));
    }

    useEffect(() => {
        console.log("DEĞİŞTİ: ", expand)
    }, [expand])

    const GetData = () => { //Tarih listelimi kontrol et
        console.log(expand);
        fetch(
            (
                Api.link +
                '/odata/TransportCards' +
                '?$select=Oid,SenderName,DocumentDate,TotalPackingQuantity' +
                '&$expand=TransportWaybill($select=declarationNumber)' +
                '&$top=20' +
                '&$skip=' + i +
                (expand)
            ),
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => setItems([...items, ...res.value]))
            .then(i = i + 20)
            .catch((e) => console.log(e));

    }

    useEffect(() => {
        GetTotal();
        GetData();
    }, [])

    //#region Deneme


    //#endregion

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            {items.length > 0 ? (
                <>
                    {edit ? (
                        <View style={{ alignItems: 'center' }}>
                            <Filter onFilter={(val) => [doFilter(Filters(val)), setEdit(false)]} onCancel={() => { /* setEdit(false) */ getVehicles() }} />
                            <View style={{ width: 350, height: 270, marginBottom: 15 }}>
                                <FlatList
                                    data={vehicles}
                                    showsHorizontalScrollIndicator={false}
                                    keyboardShouldPersistTaps={"handled"}
                                    renderItem={({ item }) => (
                                        <View style={{ borderWidth: 1, marginBottom: 10 }}>
                                            <Text style={{ fontSize: 25, color: 'orange', textAlign: 'center' }}>{item}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <HeaderLine />
                            <FlatList // Do it: VirtualizeList
                                data={items}
                                onEndReached={() => GetData()}
                                onEndReachedThreshold={3}
                                renderItem={({ item, index }) => (
                                    <LineBox
                                        vehicleNo={item.TransportWaybill.declarationNumber}
                                        company={item.SenderName}
                                        oid={item.Oid}
                                        date={item.DocumentDate.slice(0, 10)} // Not sure
                                        packing={item.TotalPackingQuantity}
                                        backColor={index % 2 == 0 ? '#FEFFFF' : '#F4F4F4'}
                                    />
                                )}
                            />
                            <BottomLine totals={totals}/>
                        </View>
                    )}
                </>
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Yükleniyor...</Text>
                </View>
            )
            }


        </View >


    )
}

const HeaderLine = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar }}>
                <View style={[styles.box, { borderLeftWidth: 0 }]}>
                    <Text style={styles.textStyle}>Tarih</Text>
                </View>
                <View style={[styles.box, { flex: 2 }]}>
                    <Text style={styles.textStyle}>Firma</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Fiş No</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Araç No</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textStyle}>Ambalaj</Text>
                </View>
            </View>
        </View>
    )
}

const BottomLine = ({totals}) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar }}>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Toplam Çuval</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5 }]}>
                    <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>Toplam KG</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: ThemeColors.SubHeaderBar }}>
                <View style={[styles.box, { borderWidth: .5, borderRightWidth: 0 }]}>
                    <Text style={[styles.textStyle]}>{toAmount(totals.Packing)}</Text>
                </View>
                <View style={[styles.box, { borderWidth: .5 }]}>
                    <Text style={[styles.textStyle]}>{toAmount(totals.Weight)}</Text>
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

const Eski = () => {
    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            {items.length > 0 ? (
                <>
                    {edit ? (
                        <View style={{ alignItems: 'center' }}>
                            <Filter onFilter={(val) => [doFilter(Filters(val)), setEdit(false)]} onCancel={() => { /* setEdit(false) */ getVehicles() }} />
                            <View style={{ width: 350, height: 270, marginBottom: 15 }}>
                                <FlatList
                                    data={vehicles}
                                    showsHorizontalScrollIndicator={false}
                                    keyboardShouldPersistTaps={"handled"}
                                    renderItem={({ item }) => (
                                        <View style={{ borderWidth: 1, marginBottom: 10 }}>
                                            <Text style={{ fontSize: 25, color: 'orange', textAlign: 'center' }}>{item}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    ) : (
                        <>
                            <FlatList // Do it: VirtualizeList
                                data={items}
                                onEndReached={() => GetData()}
                                onEndReachedThreshold={3}
                                renderItem={({ item, index }) => (
                                    <TransportBox
                                        vehicleNo={item.TransportWaybill.declarationNumber}
                                        company={item.SenderName}
                                        oid={item.Oid}
                                        date={item.DocumentDate.slice(0, 10)} // Not sure
                                        packing={item.TotalPackingQuantity}
                                        backColor={index % 2 == 0 ? 'darkgray' : 'lightblue'}
                                    />
                                )}
                            />
                            <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'tomato', borderRadius: 25, }} onPress={() => setEdit(true)} />
                            <TotalBox
                                mainTop={["Toplam Çuval", toAmount(totals.Packing)]}
                                mainMiddle={["Toplam KG", toAmount(totals.Weight)]}
                                mainBottom={["Toplam Hacim",]}
                            />
                        </>
                    )}
                </>
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Yükleniyor...</Text>
                </View>
            )
            }


        </View >
    )
}

export default TransportList;