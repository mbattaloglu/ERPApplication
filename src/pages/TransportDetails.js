import React, { useEffect, useReducer, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { TotalScreen } from "../components//Visuals/NewConst";
import { ThemeColors, StylesAll } from "../components/Constants";
import { LoadingScreen } from "../components/Visuals/ShortComponents";
import { GetTransportListsDetails } from "../components/ApiFunctions";
import { EditDate } from "../components/MyFunctions";

const datas = {
    isReady: false,
    totals: [
        {
            title: 'Nakliyeci',
            value: null
        },
        {
            title: 'Ambalaj',
            value: null
        },
        {
            title: 'KG',
            value: null
        },
        {
            title: 'Hacim',
            value: null
        },
    ],
    middle: [
        {
            title: "Kabul Tarihi",
            value: null,
            type: 'date'
        },
        {
            title: "Sevk Tarihi",
            value: null,
            type: 'date'
        },
        {
            title: "Gönderen Şube",
            value: null
        },
        {
            title: "Alıcı Şube",
            value: null
        },
        {
            title: "Araç No",
            value: null
        },
        {
            title: "Firma Bilgisi",
            value: null
        },
    ],
    transportCardDetails: {
        title: [
            "Ürün Cinsi",
            "Ambalaj",
            "Birimi",
            "Adet",
            "Kg",
            "Hacim"
        ],
        value: [

        ]
    },
    transportCardIncomes: {
        title: [
            "Tahsilat Tipi",
            "Hizmet Kalemi",
            "Döviz Tipi",
            "Hizmet Tutarı"
        ],
        value: [

        ]
    }
}

function Reducer(state, action) {
    try {
        return {
            totals: state.totals.map((item, index) => { return { ...item, value: action.totals[index] } }),
            middle: state.middle.map((item, index) => { return { ...item, value: item?.type == 'date' ? EditDate(action.middle[index]) : action.middle[index] } }),
            transportCardDetails: { ...state.transportCardDetails, value: action.transportCardDetails },
            transportCardIncomes: { ...state.transportCardIncomes, value: action.transportCardIncomes },
            isReady: true,
        }
    } catch (err) {
        console.log(`HATA: ${err}. Konum: Reducer/catch()`)
        return state
    }
}

const TransportDetails = ({ route }) => {

    const [state, dispatch] = useReducer(Reducer, datas);

    const [activePage, setActivePage] = useState(false);

    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = async () => {
        const data = await GetTransportListsDetails(route.params.oid)
        dispatch({
            totals: [
                data.TransportShipperPlate.Plate,
                data.TotalPackingQuantity,
                data.TotalWeight,
                data.CalculatedTotalVolume
            ],
            middle: [
                data.DocumentDate.slice(0, 10),
                data.ShipmentDate.slice(0, 10),
                data.SenderBranch.BranchName,
                data.ReceiverBranch.BranchName,
                data.TransportWaybill.declarationNumber,
                data.SenderName
            ],
            transportCardDetails: FormatDetails(data.TransportCardDetails),
            transportCardIncomes: FormatIncomes(data.TransportCardIncomes)
        })

    }

    function FormatIncomes(datas) {
        let data = []
        for (let item in datas) {
            data.push(
                [
                    datas[item].IncomePaymentType,
                    '',
                    datas[item].CurrencyType.Name,
                    datas[item].Amount
                ]
            )
        }
        return data
    }

    function FormatDetails(datas) {
        let data = []
        for (let item in datas) {
            data.push(
                [
                    datas[item].TransportProduct.Name,
                    datas[item].PackingQuantity,
                    datas[item].TransportUnitMultiplier.Name,
                    datas[item].Quantity,
                    datas[item].Weight,
                    datas[item].Volume
                ]
            )
        }
        return data
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                state.isReady ? (
                    <>
                        <TotalScreen items={state.totals} style={{ flex: .15, marginVertical: 20 }} />
                        <DefaultShadowBox datas={state.middle} style={{ flex: .35, marginVertical: 0, marginBottom: 20 }} />
                        <SwitchButton onClick={(bool) => setActivePage(bool)} style={{ flex: .08, marginBottom: 20, }} />
                        {
                            activePage ? (
                                <>
                                    <TransportItems items={state.transportCardDetails} style={{ flex: .42 }} height={160} />
                                </>
                            ) : (
                                <>
                                    <TransportItems items={state.transportCardIncomes} style={{ flex: .42 }} height={120} />
                                </>
                            )
                        }
                    </>
                ) : (
                    <LoadingScreen color={ThemeColors.transportList.SubHeaderBar} />
                )
            }
        </View>
    )
}

const DefaultShadowBox = ({ datas = [], style }) => {
    return (
        <View style={[StylesAll.profileCard, style]}>
            {
                datas.map((item, index) => {
                    return (
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }} key={index}>
                            <Text style={[styles.titleText, { flex: 2 }]}>{item.title}</Text>
                            <Text style={{}}>  :  </Text>
                            <Text style={[styles.valueText, { flex: 3, textAlign: 'right' }]}>{item.value}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}



const TransportItems = ({ items, style, height }) => {
    return (
        <View style={style}>
            <FlatList
                data={items.value}
                keyExtractor={(index) => index}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={[StylesAll.profileCard, { marginVertical: 0, marginBottom: 20, height: height, backgroundColor: index % 2 == 0 ? '#FEFFFF' : '#f8f9fa' }]}>
                            {
                                item.map((data, index) => {
                                    return (
                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }} key={index}>
                                            <Text style={[styles.titleText, { flex: 1 }]}>{items.title[index]}</Text>
                                            <Text style={{}}>  :  </Text>
                                            <Text style={[styles.valueText, { flex: 2, textAlign: 'right' }]}>{data}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                }}
            />
        </View>
    )
}

const SwitchButton = ({ onClick, style }) => {
    const [keySwitch, setKeySwitch] = useState(false);
    return (
        <View style={[{ flexDirection: 'row', marginHorizontal: '3%', flex: 1 }, style]}>
            {/* false */}
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => { keySwitch ? [setKeySwitch(false), onClick(false)] : null }}
                disabled={!keySwitch}
            >
                <View style={[styles.switchBox, { borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: keySwitch ? ThemeColors.transportList.SecondSubHeaderBar : ThemeColors.transportList.SubHeaderBar }]}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>HİZMETLER</Text>
                </View>
            </TouchableOpacity>

            {/* true */}
            <TouchableOpacity
                style={{ flex: 1, marginLeft: 2 }}
                onPress={() => { keySwitch ? null : [setKeySwitch(true), onClick(true)] }}
                disabled={keySwitch}
            >
                <View style={[styles.switchBox, { borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: keySwitch ? ThemeColors.transportList.SubHeaderBar : ThemeColors.transportList.SecondSubHeaderBar }]}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>SEVK KALEMLERİ</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    switchBox: {
        backgroundColor: ThemeColors.transportList.SubHeaderBar,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    titleText: {
        fontWeight: '500',
        color: 'black',
        fontSize: 14
    },
    valueText: {
        fontWeight: '400',
        color: 'black',
        fontSize: 14
    }
})

export default TransportDetails;