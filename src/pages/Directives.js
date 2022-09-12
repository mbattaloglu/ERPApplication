import { loadOptions } from "@babel/core";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { User, Api, ThemeColors, Icons } from "../components/Constants";
import { toAmount } from "../components/ConstFunctions";

import { HeaderLine, MiddleLine, BottomLine } from "../components/NewConst";

var MaxTop = 0;

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

// http://193.53.103.178:5312/api/odata/TransportPaymentDirectives/97209/GetCustomerTransportPaymentDirective(Date>'2022-01-01 00:00:00' & Date<'2022-01-31 23:59:59')
const Directives = () => {

    const [items, setItems] = useState([]);
    const [top, setTop] = useState(20);

    const GetAllDatas = useMemo(async () => {
        console.log("Talimatlarım verileri çekildi!");
        var datas = await fetch(Api.link + '/odata/TransportPaymentDirectives?$filter=CustomerSupplier/Oid eq 97209 &$orderby=Date&$select=Date,Desc,Code,Amount,TPDPaymentStatus&$expand=CurrencyType($select=Name)',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .catch((err) => console.log(err))

        MaxTop = datas.value.length;

        let tpPaid = 0;
        let tpPartiallyPaid = 0;
        let tpNotPaid = 0;
        for (let i = 0; i < MaxTop; i++) {
            if (datas.value[i].TPDPaymentStatus == 'Paid') {
                tpPaid += datas.value[i].Amount;
            }
            else if (datas.value[i].TPDPaymentStatus == 'PartiallyPaid') {
                tpPartiallyPaid += datas.value[i].Amount;
            }
            else if (datas.value[i].TPDPaymentStatus == 'NotPaid') {
                tpNotPaid += datas.value[i].Amount;
            }
        }

        bottomList[0].amount = toAmount(tpNotPaid.toFixed(2));
        bottomList[1].amount = toAmount(tpPartiallyPaid.toFixed(2));
        bottomList[2].amount = toAmount(tpPaid.toFixed(2));

        setItems(EditDatas(datas.value));
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
        { // Para Birimi
            text: 'Para Birimi',
        },
        { // Tutar
            text: 'Tutar',
        },
        { // Durum
            text: 'Durum',
        }
    ]

    const itemStyles = [
        { // Tarih
            
        },
        { // Talimat No
            
        },
        { // Açıklama
            flex: 1.5,
            numberOfLines: 2
        },
        { // Tutar
            
        },
        { // Durum

        },

    ]

    const boxStyles = {
        icon: Icons.image,
        height: 153,
    }

    if (items.length > 0) {
        console.log("Max: ", MaxTop)
    }

    return (
        <>
            {
                items.length > 0 ? (
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <MiddleLine
                                items={items.slice(0, top)}
                                itemStyles={itemStyles}
                                onEnd={() => top < MaxTop ? setTop(top + 20) : null}
                                titles={titles}
                                boxStyles={boxStyles}
                            />
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
                    { // Para Birimi
                        title: temp.CurrencyType.Name,
                    },
                    { // Tutar
                        title: toAmount(Math.abs(temp.Amount).toFixed(2)),
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