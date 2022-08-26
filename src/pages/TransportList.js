import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { User, Api, ThemeColors } from "../components/Constants";

import { HeaderLine, MiddleLine, BottomLine } from "../components/NewConst";


var i = 0;

// Çift Sevk Kalemi 33714

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
            .then(res => res.value)
            .then(res => setItems([...items, ...EditDatas(res)]))
            .then(i = i + 20)
            .catch((e) => console.log(e));

    }


    useEffect(() => {
        GetTotal();
        GetData();
    }, [])

    const titles = [
        { // Tarih
            text: 'Tarih',
            flex: 1.2
        },
        { // Firma
            text: 'Firma',
            flex: 1.8
        },
        { // Fiş No
            text: 'Fiş No',
            flex: .7
        },
        { // Araç No
            text: 'Araç No',
        },
        { // Ambalaj
            text: 'Ambalaj',
        }
    ]

    const boxStyles = [
        { // Tarih
            flex: 1.2
        },
        { // Firma
            textAlign: 'left',
            numberOfLines: 2,
            flex: 1.8,
        },
        { // Fiş No
            ellipsizeMode: 'head',
            textAlign: 'right',
            flex: .7
        },
        { // Araç No

        },
        { // Ambalaj

        },

    ]

    const bottomList = [
        {
            text: 'Toplam Çuval',
            amount: '0'
        },
        {
            text: 'Toplam KG',
            amount: '0'
        },
    ]

    return (
        <>
            {
                items.length > 0 ? (
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <HeaderLine titles={titles} col={ThemeColors.transportList.SubHeaderBar} />
                        <View style={{ flex: 1 }}>
                            <MiddleLine
                                items={items}
                                boxStyles={boxStyles}
                                onEnd={() => GetData()}
                                canClick
                                command={(oid) => navigation.navigate('TransportDetails', {oid})}
                            />
                        </View>
                        <BottomLine items={bottomList} col={ThemeColors.transportList.SubHeaderBar} />
                    </View>
                ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Yükleniyor...</Text>
                    </View>
                )
            }
        </>
    )
}

function EditDatas(datas) {
    if (typeof (datas) !== "object") {
        console.log("HATA: Girilen veri bir obje değil. Mevcut Tipi: ", typeof (datas))
        return null;
    }
    var newData = [];
    let l = Object.keys(datas).length
    for (let i = 0; i < l; i++) {
        const temp = datas[i];
        newData.push(
            [
                [
                    { // Tarih
                        title: temp.DocumentDate.slice(0, 10),
                    },
                    { // Firma
                        title: temp.SenderName,
                    },
                    { // Fiş No
                        title: temp.Oid,
                    },
                    { // Araç No
                        title: temp.TransportWaybill.declarationNumber,
                    },
                    { // Ambalaj
                        title: temp.TotalPackingQuantity
                    },
                ]
            ]
        )
    }
    return newData;
}

export default TransportList;