import React, { useMemo, useState, useReducer } from "react";
import { Alert, Dimensions, View } from "react-native";
import { ThemeColors, Icons } from "../components/Constants";

import { AddButon, DataScreen, OpenScreen } from "../components/NewConst";


import { EditDate, Reducer, toAmount } from "../components/MyFunctions";
import { LoadingScreen, NoDataScreen } from "../components/ShortComponents";

import { GetList, GetTotals, PostUploadImage } from "../components/ApiFunctions";

import ImagePicker from 'react-native-image-crop-picker';

var skip = 0;
var top = 15;
const type = 'TransportPaymentDirectives';
const HEIGHT = Dimensions.get('window').height;

const datas = {
    lists: [],
    totals: [
        {
            title: 'Onay Bekleyen',
            value: '0'
        },
        {
            title: 'Onaylanan',
            value: '0'
        },
        {
            title: 'Ödenen',
            value: '0'
        },
    ],
    listDetails: {
        filter: false,
        amount: 0,
    },
    noData: false,
}


const Directives = ({ navigation, route }) => {

    //İlk veriler geldi mi?
    const [loading, setLoading] = useState(false);

    //Tüm verileri tutuyor: 'lists, totals, noData'
    const [state, dispatch] = useReducer(Reducer, datas);
    const [adding, setAdding] = useState(false);

    useMemo(() => {
        GetAll(route.params?.filters);
    }, [route.params])

    async function GetAll(filters = '') {
        setLoading(true);
        const lists = await GetList(type, 0, top, filters) // SORUN: Verileri hemen vermiyor!
        var totals = await GetTotals(type, filters)
        function GetSelectedValue(list, type) {
            for (let item in list) {
                if (list[item].PStatus == type)
                    return list[item].Amount
            }
            return 0
        }
        totals = {
            Paid: GetSelectedValue(totals, 'Paid'),
            PartiallyPaid: GetSelectedValue(totals, 'PartiallyPaid'),
            NotPaid: GetSelectedValue(totals, 'NotPaid')
        }
        const filter = filters.length > 0
        dispatch({ type: 'first', lists: EditDatas(lists['value']), filter: filter, totals: [toAmount(totals.Paid), toAmount(totals.PartiallyPaid), toAmount(totals.NotPaid)], total: lists['@odata.count'] })
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

    function ImageWithCamera(oid) {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            compressImageQuality: .8
        }).then(image => {
            UploadImage({ oid: oid, data: image.data })
        });
    }

    function ImageFromGallery(oid) {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            compressImageQuality: .8
        }).then(image => {
            UploadImage({ oid: oid, data: image.data })
        });
    }

    async function UploadImage({ oid, data }) {
        const message = await PostUploadImage({ oid: oid, image: data })
        Alert.alert(
            "Talimat",
            message,
            [
                {
                    text: "Tamam",
                }
            ]
        )
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
                                <LoadingScreen color={ThemeColors.directives.SubHeaderBar} />
                            }
                            canClick //TODO: Destroy this
                            command={(oid) => {
                                Alert.alert(
                                    "Talimat",
                                    "Nereden resim yüklemek istiyorsunuz?",
                                    [
                                        {
                                            text: "İptal",
                                            onPress: () => { },
                                            style: "cancel"
                                        },
                                        {
                                            text: "Galeri",
                                            onPress: () => ImageFromGallery(oid)
                                        },
                                        {
                                            text: "Kamera",
                                            onPress: () => ImageWithCamera(oid)
                                        },
                                    ]
                                );
                            }}
                            titles={titles}
                        />
                    </View>
                ) : (
                    <>
                        {
                            state.noData && !loading ? (
                                <NoDataScreen />
                            ) : (
                                <LoadingScreen color={ThemeColors.directives.SubHeaderBar} />
                            )
                        }
                    </>
                )
            }
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                    marginHorizontal: '7%',
                    alignSelf: 'center',
                }}>
                {
                    <AddButon addCommand={() => navigation.navigate("PostDirective")} />
                }
                <OpenScreen items={[state.totals, state.listDetails]} color={"directives"} />
            </View>
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
                        title: EditDate(temp.Date.slice(0, 10)),
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
                    { // Oid
                        oid: temp.Oid
                    },
                ]
            ]
        )
    }
    return newData;
}

export default Directives;