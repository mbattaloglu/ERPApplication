import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { User, ThemeColors } from "../components/Constants";
import { toAmount } from "../components/ConstFunctions";

import { HeaderLine, MiddleLine, BottomLine } from "../components/NewConst";

var i = 0;


const CustomerSuppliers = ({ navigation }) => {

    console.log("Yenilendi.")

    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalBakiye, setTotalBakiye] = useState(0);

    const GetTotal = async () => {
        try {
            console.log("Toplam aldi.")
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
            //setTotalDebit(debit); // 2
            //setTotalCredit(credit); // 3
            //setTotalBakiye(debit - credit); // 4
        } catch (e) {
            console.log(e);
        }
    }

    const [items, setItems] = useState([]);

    const GetData = () => {
        console.log("Veri çekti.")
        fetch('http://193.53.103.178:5312/api/odata/CustomerSuppliers?$expand=DefaultCurrencyType($select=Name),FinancialTrxs($orderby=TrxDate;$select=TrxDate,LineDescription,SubType,Oid,Amount;$top=20;$skip=' + i + ')&$select=FinancialTrxs', {
            method: 'GET', /* or POST/PUT/PATCH/DELETE */
            headers: {
                'Authorization': 'Bearer ' + User.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => res.value[0].FinancialTrxs)
            .then(res => setItems([...items, ...EditDatas(res)])) // 1
            .then(i = i + 20)
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        GetData();
        GetTotal();
    }, [])

    const titles = [
        { // Tarih
            text: 'Tarih',
        },
        { // Talimat No
            text: 'Talimat No',
        },
        { // Açıklama
            text: 'Açıklama',
        },
        { // Tipi
            text: 'Tipi',
        },
        { // Para Birimi
            text: 'Para Birimi',
        },
        { // Tutar
            
        },
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
        { // Tipi

        },
        { // Para Birimi
            
        },
        { // Tutar

        }
    ]

    const boxStyles = {
        height: 153
    }

    const bottomList = [
        {
            text: 'Borcu',
            amount: '0'
        },
        {
            text: 'Alacağı',
            amount: '0'
        },
        {
            text: 'Bakiye',
            amount: '0'
        },
    ]


    return (
        <>
            {
                items.length > 0 ? (
                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <MiddleLine items={items} boxStyles={boxStyles} titles={titles} itemStyles={itemStyles} onEnd={() => GetData()} />
                        </View>
                        <BottomLine items={bottomList} col={ThemeColors.customerSuppliers.SubHeaderBar} />
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
                        title: temp.TrxDate.slice(0, 10),
                    },
                    { // Talimat No
                        title: temp.Oid,
                    },
                    { // Açıklama
                        title: temp.LineDescription,
                    },
                    { // Tipi
                        title: temp.SubType,
                    },
                    { // Para Birimi
                        title: "USD", // HATIRLA: Manüel
                    },
                    { // Tutar
                        title: toAmount(Math.abs(temp.Amount).toFixed(2)),
                        color: temp.Amount > 0 ? 'red' : 'green',
                        mainTitle: temp.Amount > 0 ? 'Borç' : 'Alacak'
                    },
                ],
                {
                    color: temp.Amount > 0 ? 'red' : 'green',
                    b_a: temp.Amount > 0 ? 'Borç' : 'Alacak'
                }
            ]
        )
    }
    return newData;
}

export default CustomerSuppliers;