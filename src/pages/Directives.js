import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { User, Api, ThemeColors } from "../components/Constants";
import { toAmount } from "../components/ConstFunctions";

import { HeaderLine, MiddleLine, BottomLine } from "../components/NewConst";


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
            .then(res => res.value)
            .then(res => setItems([...items, ...EditDatas(res)]))
            .then(i = i + 10)
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        GetData();
    }, [])

    const titles = [
        { // Tarih
            text: 'Tarih',
            flex: 1.1
        },
        { // Talimat No
            text: 'Talimat No',
            flex: .7
        },
        { // Açıklama
            text: 'Açıklama',
            flex: 1.3
        },
        { // Tutar
            text: 'Tutar',
        },
        { // Durum
            text: 'Durum',
        }
    ]

    const boxStyles = [
        { // Tarih
            flex: 1.1
        },
        { // Talimat No
            ellipsizeMode: 'head',
            textAlign: 'right',
            flex: .7
        },
        { // Açıklama
            textAlign: 'left',
            numberOfLines: 4,
            flex: 1.3,
        },
        { // Tutar
            numberOfLines: 2,
            textAlign: 'right',
        },
        { // Durum

        },

    ]

    const bottomList = [
        {
            text: 'Onay Bekleyen',
            amount: '0'
        },
        {
            text: 'Onaylanan',
            amount: '0'
        },
        {
            text: 'Ödenen',
            amount: '0'
        },
    ]


    return (
        <>
            {
                items.length > 0 ? (
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <HeaderLine titles={titles} col={ThemeColors.directives.SubHeaderBar} />
                        <View style={{ flex: 1 }}>
                            <MiddleLine items={items} boxStyles={boxStyles} onEnd={() => GetData()} />
                        </View>
                        <BottomLine items={bottomList} col={ThemeColors.directives.SubHeaderBar} />
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
                        title: temp.Date.slice(0, 10),
                    },
                    { // Talimat No
                        title: parseInt(temp.Code),
                    },
                    { // Açıklama
                        title: temp.Desc,
                    },
                    { // Tutar
                        title: toAmount(Math.abs(temp.Amount).toFixed(2)) + '\n ' + temp.CurrencyType.Name,
                    },
                    { // Durum
                        title: temp.TPDPaymentStatus == 'Paid' ? 'Onaylı' : 'Onaysız'
                    },
                ]
            ]
        )
    }
    return newData;
}

export default Directives;