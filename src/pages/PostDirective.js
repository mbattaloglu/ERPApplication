import React from "react";
import { View, Text } from "react-native";
import { GetVehicleNames } from "../components/ApiFunctions";

import InputLine from "../components/InputLine";

const PostDirective = ({ navigation, route }) => {

    const data = {
        aciklama: '',
        ambalaj: '',
        tutar: '',
        cek: route.params?.data,
        tarih: ''
    }

    function SayToMe() {
        console.log(data)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: '5%' }} />
            <View style={{ marginHorizontal: '5%', borderRadius: 5, elevation: 3, marginBottom: '5%', backgroundColor: 'white', flex: .25 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: .38 }}>
                        <Text style={{ paddingHorizontal: '10%', flex: 1 }} numberOfLines={1}>Cari Kodu</Text>
                        <Text>:</Text>
                    </View>
                    <View style={{ flex: .62, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right', paddingHorizontal: '5%' }}>BS-10</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: .38 }}>
                        <Text style={{ paddingHorizontal: '10%', flex: 1 }} numberOfLines={1}>Döviz Tipi</Text>
                        <Text>:</Text>
                    </View>
                    <View style={{ flex: .62, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right', paddingHorizontal: '5%' }}>USD</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: .38 }}>
                        <Text style={{ paddingHorizontal: '10%', flex: 1 }} numberOfLines={1}>Firma</Text>
                        <Text>:</Text>
                    </View>
                    <View style={{ flex: .62, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right', paddingHorizontal: '5%' }}>HUSAM ABDULHAMID</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: .38 }}>
                        <Text style={{ paddingHorizontal: '10%', flex: 1 }} numberOfLines={1}>Evrak Tarihi</Text>
                        <Text>:</Text>
                    </View>
                    <View style={{ flex: .62, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right', paddingHorizontal: '5%' }}>02.06.2022</Text>
                    </View>
                </View>
            </View>

            <InputLine
                title={'Açıklama'}
                tempValue={'Açıklama giriniz'}
                type={'Metin'}
                changeData={(value) => data.aciklama = value}
            />

            <InputLine
                title={'Ambalaj Miktarı'}
                tempValue={'Miktar giriniz'}
                type={'Metin'}
                changeData={(value) => data.ambalaj = value}
                keyboardType="number-pad"
            />

            <InputLine
                title={'Tutar'}
                tempValue={'Tutar giriniz'}
                type={'Metin'}
                changeData={(value) => data.tutar = value}
                keyboardType="number-pad"
            />

            <InputLine
                title={'Çek No'}
                tempValue={'Çek seçiniz'}
                type={'Seç'}
                currValue={route.params?.data}
                command={() => navigation.navigate('FilterDatas', { type: 'declarationNumber', commandData: GetVehicleNames(), backPage: 'PostDirective' })}
            />

            {/* <InputLine
                title={'Tarih'}
                tempValue={'Tarih seçiniz'}
                type={'Tarih'}
                changeData={(value) => data.tarih = value}
            /> */}
        </View>
    )
}


export default PostDirective;