import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const SearchBar = ({ commCallBack, resetCallBack, holderText }) => {

    const [value, setValue] = useState('');

    return (
        <View style={{ flexDirection: 'row', paddingLeft: 10, borderBottomWidth: .5 }}>
            <View style={{ height: 45, borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginVertical: 20, flex: .8 }}>
                <TextInput
                    style={{ fontSize: 15, fontWeight: '500', color: 'black', flex: 1, paddingHorizontal: 10 }}
                    placeholder={holderText}
                    onChangeText={(value) => { setValue(value), commCallBack(value) }}
                    value={value}
                ></TextInput>
            </View>
            <TouchableOpacity
                style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }}
                disabled={!value}
                onPress={() => { setValue(''), resetCallBack() }}
            >
                <Text style={{ fontSize: 20, color: value ? '#212529' : '#adb5bd' }}>Sil</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SearchBar;