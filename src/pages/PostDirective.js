import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { GetUserInfo, GetVehicleNames, PostPaymentDirective } from "../components/ApiFunctions";
import BasicBox from "../components/BasicBox";
import { ThemeColors } from "../components/Constants";
import CustomButton from "../components/CustomButton";

import InputLine from "../components/InputLine";
import { EditDate, GetToday } from "../components/MyFunctions";
import { LoadingScreen } from "../components/ShortComponents";

const listDatas = {
    code: {
        title: 'Cari Kodu',
        value: '',
    },
    currency: {
        title: 'Döviz Tipi',
        value: '',
    },
    company: {
        title: 'Firma',
        value: '',
    },
    date: {
        title: 'Evrak Tarihi',
        value: '',
    },
}

function Reducer(state, action) {
    try {
        return {
            code: { ...state.code, value: action.data.Code },
            currency: { ...state.currency, value: action.data.DefaultCurrencyType.Name },
            company: { ...state.company, value: action.data.Name },
            date: { ...state.date, value: EditDate(GetToday()?.slice(0, 10)) }
        }
    } catch (err) {
        console.log(`Hata: ${err}. Konum: Reducer/catch()`)
        return state
    }
}

const PostDirective = ({ navigation, route }) => {

    const [state, dispatch] = React.useReducer(Reducer, listDatas)

    const data = {
        desc: '',
        packing: '',
        amount: '',
        check: '',
    }

    async function GetOtherDatas() {
        const datas = await GetUserInfo()
        dispatch({ data: datas })
    }

    useEffect(() => {
        console.log("1 kereye mahsus.")
        GetOtherDatas()
    }, [])

    async function CreateNew() {
        const message = await PostPaymentDirective(
            {
                desc: data.desc,
                packing: data.packing,
                amount: parseFloat(data.amount),
                check: data.check,
                date: new Date(),
            }
        )
        console.log(message)
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

    function AreYouSure() {
        Alert.alert(
            "Onaylıyor musun?",
            "Talimat oluşturmak üzeresiniz.",
            [
                {
                    text: "İptal",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Devam",
                    onPress: () => CreateNew()
                }
            ]
        );
    }

    return (
        <>
            {
                state.date.value ? (
                    <View style={{ flex: 1, paddingHorizontal: '5%' }}>
                        <View style={{ marginBottom: '5%' }} />

                        <BasicBox
                            listDatas={state}
                        />

                        <InputLine
                            title={'Açıklama'}
                            tempValue={'Açıklama giriniz'}
                            type={'Metin'}
                            changeData={(value) => data.desc = value}
                        />

                        <InputLine
                            title={'Ambalaj Miktarı'}
                            tempValue={'Miktar giriniz'}
                            type={'Metin'}
                            changeData={(value) => data.packing = value}
                            keyboardType="number-pad"
                        />

                        <InputLine
                            title={'Tutar'}
                            tempValue={'Tutar giriniz'}
                            type={'Metin'}
                            changeData={(value) => data.amount = value}
                            keyboardType="number-pad"
                        />

                        <InputLine
                            title={'Çek No'}
                            tempValue={'Çek seçiniz'}
                            type={'Seç'}
                            currValue={route.params?.data}
                            changeData={(value) => data.check = value}
                            deleteData={() => navigation.setParams({ data: null })}
                            command={() => navigation.navigate('FilterDatas', { type: 'declarationNumber', commandData: GetVehicleNames(), backPage: 'PostDirective', color: ThemeColors.directives.SubHeaderBar })}
                        />

                        <CustomButton
                            title={'Olustur'}
                            boxStyle={{
                                marginTop: '3%',
                                backgroundColor: '#6b9080',
                                alignSelf: 'flex-end',
                                paddingHorizontal: '8%'
                            }}
                            onClickHandler={() => AreYouSure()}
                        />
                    </View>
                ) : (
                    <LoadingScreen />
                )
            }
        </>

    )
}


export default PostDirective;