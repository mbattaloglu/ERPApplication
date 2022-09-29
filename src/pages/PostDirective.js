import React, { useEffect, useMemo, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { GetVehicleNames } from "../components/ApiFunctions";
import { Icons, StylesAll } from "../components/Constants";
import CustomButton from "../components/CustomButton";

const PostDirective = ({ navigation, route }) => {

    const data = {
        aciklama: '',
        ambalaj: '',
        tutar: '',
        cek: route.params?.data,
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
                navigation={navigation}
            />

        </View>
    )
}

const InputLine = ({ title, type, command, keyboardType, tempValue, currValue, changeData = () => { } }) => {
    const [value, setValue] = useState();
    const focus = React.useRef();
    var icon;

    changeData(value);

    useEffect(() => {
        if (currValue)
            setValue(currValue)
    }, [currValue])

    switch (type) {
        case 'Seç':
            icon = Icons.search
            break;
        case 'Tarih':
            icon = Icons.calendar
            break;
        case 'Metin':
            icon = Icons.keyboard
            break;
    }
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'white', flex: .07, marginHorizontal: '5%', borderRadius: 5, elevation: 3, marginBottom: '2%' }}>
            <View style={{ flex: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ paddingHorizontal: '10%', flex: 1 }} numberOfLines={1}>{title}</Text>
                <Text>:</Text>
            </View>
            {
                type == 'Seç' || type == 'Tarih' ? (
                    <TouchableOpacity
                        style={{ flex: 4, justifyContent: 'center' }}
                        onPress={command}
                    >
                        {
                            value ? (
                                <Text style={{ textAlign: 'right', paddingHorizontal: '5%' }}>{value}</Text>
                            ) : (
                                <Text style={{ textAlign: 'right', paddingHorizontal: '5%', color: 'darkgray' }}>{tempValue}</Text>
                            )
                        }
                    </TouchableOpacity>
                ) : type == 'Metin' && (
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput
                            ref={focus}
                            keyboardType={keyboardType}
                            style={{ textAlign: 'right', paddingHorizontal: '5%' }}
                            placeholder={tempValue}
                            onChangeText={(value) => setValue(value)}
                        >{value}</TextInput>
                    </View>
                )
            }
            <TouchableOpacity
                style={{ aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={value ? () => setValue('') : type == 'Metin' ? () => focus.current.focus() : command}
            >
                {
                    value ? (
                        <Image style={styles.image} source={Icons.cancel} />
                    ) : (
                        <Image style={[styles.image, { tintColor: 'gray' }]} source={icon} />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {

    },
    value: {

    },
    image: {
        flex: .4,
        aspectRatio: 1
    }
})


export default PostDirective;