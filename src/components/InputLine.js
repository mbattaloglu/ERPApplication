import React, { useEffect, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Icons } from "../components/Constants";

import DateTimePicker from "react-native-modal-datetime-picker";
import { EditDate } from "../components/MyFunctions";

const InputLine = ({ title, type, command = () => { }, keyboardType, tempValue, currValue, changeData = () => { }, deleteData = () => { } }) => {
    const [value, setValue] = useState();
    const focus = React.useRef();
    var icon;

    if (value)
        changeData(value)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        if (currValue) {
            setValue(currValue)
            console.log("Değişti: ", currValue)
        }
    }, [currValue])

    switch (type) {
        case 'Seç':
            icon = Icons.search
            break;
        case 'Tarih':
            icon = Icons.calendar
            command = () => setDatePickerVisibility(true);
            break;
        case 'Metin':
            icon = Icons.keyboard
            command = () => focus.current.focus()
            break;
    }

    const handleConfirm = (date) => {
        date = JSON.stringify(date)?.slice(1, 11)
        setDatePickerVisibility(false);
        setValue(date);
    };

    function deleteValue() {
        setValue('')
        deleteData()
    }

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            flex: .08,
            borderRadius: 5,
            elevation: 3,
            marginBottom: '2%'
        }}>
            <View style={{
                flex: 4,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={[styles.title, { flex: 1 }]} numberOfLines={1}>{title}</Text>
                <Text style={[styles.title, { paddingHorizontal: 0 }]}>:</Text>
            </View>
            {
                type == 'Seç' || type == 'Tarih' ? (
                    <TouchableOpacity
                        style={{ flex: 3, justifyContent: 'center' }}
                        onPress={command}
                    >
                        {
                            value ? (
                                <Text style={[styles.value, { color: '#3a5a40' }]} numberOfLines={1}>{type == 'Tarih' ? EditDate(value) : value}</Text>
                            ) : (
                                <Text style={[styles.value, { textDecorationLine: 'underline' }]} numberOfLines={1}>{tempValue}</Text>
                            )
                        }
                    </TouchableOpacity>
                ) : type == 'Metin' && (
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput
                            ref={focus}
                            keyboardType={keyboardType}
                            style={[styles.value, { color: '#3a5a40' }]}
                            placeholderTextColor={'darkgray'}
                            placeholder={tempValue}
                            onChangeText={(value) => setValue(value)}
                        >{value}</TextInput>
                    </View>
                )
            }
            <TouchableOpacity
                style={{ aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={value ? () => deleteValue() : command}
            >
                {
                    value ? (
                        <Image style={styles.image} source={Icons.cancel} />
                    ) : (
                        <Image style={[styles.image, { tintColor: 'gray' }]} source={icon} />
                    )
                }
            </TouchableOpacity>
            {
                type == 'Tarih' && <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        color: 'black',
        paddingHorizontal: '10%'
    },
    value: {
        fontSize: 13,
        color: 'darkgray',
        textAlign: 'right',
        paddingHorizontal: '5%'
    },
    image: {
        flex: .4,
        aspectRatio: 1
    }
})

export default InputLine;