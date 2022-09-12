import React, { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Icons, User } from "../../components/Constants";
import NewFilterLine from "../../components/NewFilterLine";

import DoubleButton from "../../components/DoubleButton";

const HEIGHT = 180;

const TransportFilter = ({ navigation, route }) => {

    console.log("Her şey yüklendi.")

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    /* useMemo(() => {
        if (route.params?.vehicle) {
            setVehicle(route?.params?.vehicle)
            console.log("Ben1")
        }
        else if (route.params?.company) {
            setCompany(route?.params?.company)
            console.log("Ben2")
        }
        //console.log(route?.params?.company)
    }, [route.params]) */

    const datas = [
        {
            header: 'Başlangıç Tarihi',
            filter: 'Tarih seçiniz',
            icon: Icons.calendar,
            value: null,
            command: () => { },
        },
        {
            header: 'Bitiş Tarihi',
            filter: 'Tarih seçiniz',
            icon: Icons.calendar,
            value: null,
            command: () => { },
        },
        {
            header: 'Araç No',
            filter: 'Araç seçiniz',
            icon: Icons.search,
            value: null,
            command: ({ navigation }) => navigation.navigate('FilterDatas', { type: 'vehicle' }),
        },
        {
            header: 'Firma',
            filter: 'Firma seçiniz',
            icon: Icons.search,
            value: null,
            command: (navigation) => navigation.navigate('FilterDatas'),
        },
    ]

    console.log(route?.params?.company)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 30, marginTop: 20, height: HEIGHT }}>
                <NewFilterLine
                    width={300}
                    title={'Başlangıç Tarihi'}
                    temporaryFilter={'Tarih seçiniz'}
                    currentFilter={startDate}
                    icon={Icons.calendar}
                    command={() => { }}
                />
                <NewFilterLine
                    width={300}
                    title={'Bitiş Tarihi'}
                    temporaryFilter={'Tarih seçiniz'}
                    currentFilter={endDate}
                    icon={Icons.calendar}
                    command={() => { }}
                />
                <NewFilterLine
                    width={300}
                    title={'Araç No'}
                    temporaryFilter={'Araç seçiniz'}
                    currentFilter={route.params?.vehicle}
                    icon={Icons.search}
                    command={() => { }}
                />
                <NewFilterLine
                    width={300}
                    title={'Firma'}
                    temporaryFilter={'Firma seçiniz'}
                    currentFilter={route.params?.company}
                    icon={Icons.search}
                    command={() => navigation.navigate('FilterDatas', { type: 'company' })}
                    deleteCommand={() => [navigation.setParams({ company: null })]}
                />
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    filterTitle: {
        fontSize: 14,
        color: '#8C8C8C',
        textAlign: 'right',
        textAlignVertical: 'center',
        textDecorationLine: 'underline',
    },
    icon: {
        width: HEIGHT * 2 / 5 / 4,
        height: HEIGHT * 2 / 5 / 4,
        tintColor: '#7D7D7D',
    },
    iconView: {
        height: HEIGHT / 4,
        width: HEIGHT / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default TransportFilter;