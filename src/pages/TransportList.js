import React, { useState, useMemo, useReducer } from "react";
import { View } from "react-native";
import { ThemeColors, Icons } from "../components/Constants";

import { DataScreen } from "../components/NewConst";

import { EditDate, Reducer } from "../components/MyFunctions";
import { GetList, GetTotals } from "../components/ApiFunctions";

import { NoDataScreen, LoadingScreen } from "../components/ShortComponents";

var skip = 0;
var top = 15;

const datas = {
    lists: [],
    totals: [
        {
            title: 'Çuval',
            value: 0
        },
        {
            title: 'KG',
            value: 0
        },
        {
            title: 'Hacim',
            value: 0
        },
    ],
    listDetails: {
        filter: false,
        amount: 0,
    },
    noData: false,
}


const TransportList = ({ navigation, route }) => {

    //İlk veriler geldi mi?
    const [loading, setLoading] = useState(false);

    //Tüm verileri tutuyor: 'lists, totals, noData'
    const [state, dispatch] = useReducer(Reducer, datas);

    useMemo(() => {
        GetAll(route.params?.filters);
    }, [route.params])

    /** İlk gelecek verileri çağırıyor
     * 
     * @param filters Filtre ekler. (Opsiyonel)
     */
    async function GetAll(filters = '') {
        setLoading(true);
        const lists = await GetList('TransportCards', 0, top, filters) // SORUN: Verileri hemen vermiyor!
        var totals = await GetTotals('TransportCards', filters)
        totals = totals[0]
        console.log(totals)
        const filter = filters.length > 0
        dispatch({ type: 'first', lists: EditDatas(lists['value']), filter: filter, totals: [totals.Packing, totals.Weight, totals.Volume ? parseFloat(totals.Volume).toFixed(2) : 0], total: lists['@odata.count'] })
        skip = top;
        console.log("Tüm veriler sıfırlandı.")
        setLoading(false);
    }

    /** Yeni gelecek verileri çekiyor.
     * 
     * @param filters Filtre ekler. (Opsiyonel)
     */
    async function GetNewDatas(filters = '') {
        const newDatas = await GetList('TransportCards', skip, top, filters)
        dispatch({ type: 'add', lists: EditDatas(newDatas['value']) })
        skip += top;
        console.log("Yenileri eklendi!");
    }


    const titles = [
        { // Tarih
            text: 'Tarih',
        },
        { // Fiş No
            text: 'Fiş No',
        },
        { // Firma
            text: 'Firma',
        },
        { // Araç No
            text: 'Araç No',
        },
        { // Ambalaj
            text: 'Ambalaj',
        }
    ]

    const boxStyles = {
        icon: Icons.details,
        height: 110
    }

    const itemStyles = [
        { // Tarih

        },
        { // Firma

        },
        { // Fiş No

        },
        { // Araç No

        },
        { // Ambalaj

        },

    ]

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
                                <LoadingScreen color={ThemeColors.transportList.SubHeaderBar} />}
                            canClick //TODO: Destroy this
                            command={(oid) => navigation.navigate('TransportDetails', { oid })}
                            titles={titles}
                            color={'transportList'}
                        />
                    </View>
                ) : (
                    <>
                        {
                            state.noData && !loading ? (
                                <NoDataScreen />
                            ) : (
                                <LoadingScreen color={ThemeColors.transportList.SubHeaderBar} />
                            )
                        }
                    </>
                )
            }

        </View>
    )
}

function EditDatas(datas) {
    try {
        if (typeof (datas) !== "object") {
            console.log(`HATA: Girilen veri bir obje değil. Mevcut Tipi: ${typeof (datas)}. Konum: EditDatas`)
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
                            title: EditDate(temp.DocumentDate.slice(0, 10)),
                        },
                        { // Fiş No
                            title: temp.Oid,
                        },
                        { // Firma
                            title: temp.SenderName,
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
    catch (err) {
        console.log(`HATA: ${err}. Konum: EditDatas`)
        return null;
    }

}


export default TransportList;