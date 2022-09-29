import React, { useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { Icons } from "../components/Constants";

const PostDirective = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Line />
            <View style={{ marginBottom: 10 }} />
            <Line2 />
        </View>
    )
}

const Line = ({ image }) => {
    const [value, setValue] = useState('');
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'white', flex: .07, marginHorizontal: '5%', borderWidth: .5, borderRadius: 5 }}>
            <View style={{ flex: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ paddingHorizontal: '5%', flex: 1 }}>Açıklama</Text>
                <Text>:</Text>
            </View>
            <View style={{ flex: 4, justifyContent: 'center' }}>
                <TextInput style={{ textAlign: 'right', paddingHorizontal: '5%' }} placeholder={'Açıklama giriniz'} onChangeText={(value) => setValue(value)} inpu>{value}</TextInput>
            </View>
            <TouchableOpacity style={{ aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
                setValue('');
            }}
            >
                {
                    value ? (
                        <Image style={{ flex: .4, aspectRatio: 1 }} source={Icons.cancel} />
                    ) : (
                        <Image style={{ flex: .4, aspectRatio: 1, tintColor: 'gray' }} source={Icons.search} />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

const Line2 = ({ image }) => {
    const [value, setValue] = useState('');
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'white', flex: .07, marginHorizontal: '5%', borderWidth: .5, borderRadius: 5 }}>
            <View style={{ flex: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ paddingHorizontal: '5%', flex: 1 }}>Çek No</Text>
                <Text>:</Text>
            </View>
            <TouchableOpacity style={{ flex: 4, justifyContent: 'center' }}>
                {
                    value ? (
                        <Text style={{ textAlign: 'right', paddingHorizontal: '5%' }}>CHK-0011</Text>
                    ) : (
                        <Text style={{ textAlign: 'right', paddingHorizontal: '5%', color: 'darkgray' }}>Çek seçiniz</Text>
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    value ? (
                        <Image style={{ flex: .4, aspectRatio: 1 }} source={Icons.cancel} />
                    ) : (
                        <Image style={{ flex: .4, aspectRatio: 1, tintColor: 'gray' }} source={Icons.search} />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default PostDirective;