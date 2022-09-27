import React, { useMemo, useState, useReducer } from "react";
import { View } from "react-native";
import { ThemeColors } from "../components/Constants";
import { toAmount } from "../components/ConstFunctions";

import { DataScreen } from "../components/NewConst";

import { EditDate, Reducer } from "../components/MyFunctions";
import { GetList, GetTotals } from "../components/ApiFunctions";

import { LoadingScreen, NoDataScreen } from "../components/ShortComponents";

var skip = 0;
var top = 15;
const type = 'FinancialTrxes';

const datas = {
    lists: [],
    totals: [
        {
            title: 'Borç',
            value: '0',
            color: 'red'
        },
        {
            title: 'Alacak',
            value: '0',
            color: 'green'
        },
        {
            title: 'Bakiye',
            value: '0',
            color: ''
        },
    ],
    listDetails: {
        filter: false,
        amount: 0,
    },
    noData: false,
}

const CustomerSuppliers = ({ navigation, route }) => {

    //İlk veriler geldi mi?
    const [loading, setLoading] = useState(false);

    //Tüm verileri tutuyor: 'lists, totals, noData'
    const [state, dispatch] = useReducer(Reducer, datas);

    useMemo(() => {
        GetAll(route.params?.filters);
    }, [route.params])

    async function GetAll(filters = '') {
        setLoading(true);
        const lists = await GetList(type, 0, top, filters) // SORUN: Verileri hemen vermiyor!
        var totals = await GetTotals(type, filters)
        totals = totals[0]
        const filter = filters.length > 0
        dispatch({ type: 'firstCustomerSuppliers', lists: EditDatas(lists['value']), filter: filter, totals: [totals.Debit, totals.Credit, totals.Amount], total: lists['@odata.count'] })
        skip = top;
        console.log("Tüm veriler sıfırlandı.")
        setLoading(false);
    }

    async function GetNewDatas(filters = '') {
        const newDatas = await GetList(type, skip, top, filters)
        dispatch({ type: 'add', lists: EditDatas(newDatas['value']) })
        skip += top;
        console.log("Yenileri eklendi!");
    }

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


    return (
        <View style={{ justifyContent: 'space-between', flex: 1, backgroundColor: 'white' }}>
            {
                state.lists.length > 0 && !loading ? (
                    <View style={{ flex: 1 }}>
                        <DataScreen
                            items={state}
                            itemStyles={itemStyles}
                            boxStyles={boxStyles}
                            onEnd={() => !state.noData && GetNewDatas(route.params?.filters)}
                            feetComp={!state.noData &&
                                <LoadingScreen color={ThemeColors.customerSuppliers.SubHeaderBar} />}
                            //canClick //TODO: Destroy this
                            //command={(oid) => navigation.navigate('TransportDetails', { oid })}
                            titles={titles}
                            color={'customerSuppliers'}
                        />
                    </View>
                ) : (
                    <>
                        {
                            state.noData && !loading ? (
                                <NoDataScreen />
                            ) : (
                                <LoadingScreen color={ThemeColors.customerSuppliers.SubHeaderBar} />
                            )
                        }
                    </>
                )
            }
        </View>
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
                        title: EditDate(temp.TrxDate.slice(0, 10)),
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
                ]
            ]
        )
    }
    return newData;
}

export default CustomerSuppliers;