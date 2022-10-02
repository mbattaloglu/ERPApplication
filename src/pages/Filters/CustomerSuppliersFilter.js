import React from "react";
import { View } from "react-native";

import { filterFormat, fuseFilter } from "../../components/MyFunctions";

import DoubleButton from "../../components/DoubleButton";
import InputLine from "../../components/InputLine";

const CustomerSuppliersFilter = ({ navigation }) => {

    const datas = {
        startDate: {
            name: 'TrxDate',
            value: undefined,
            process: 'ge'
        },
        endDate: {
            name: 'TrxDate',
            value: undefined,
            process: 'le'
        },
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: '7%' }}>

            <View style={{ marginBottom: '10%' }} />

            <InputLine
                title={'Başlangıç Tarihi'}
                tempValue={'Tarih seçiniz'}
                type={'Tarih'}
                changeData={(value) => datas.startDate.value = value}
            />

            <InputLine
                title={'Bitiş Tarihi'}
                tempValue={'Tarih seçiniz'}
                type={'Tarih'}
                changeData={(value) => datas.endDate.value = value}
            />

            <DoubleButton
                type={'customerSuppliers'}
                leftCommand={() => /* navigation.goBack() */console.log(filterFormat(fuseFilter(datas), " and "))}
                rightCommand={() => { navigation.navigate("CustomerSuppliers", { filters: filterFormat(fuseFilter(datas), " and ") }) }}
            />
        </View>
    )
}

export default CustomerSuppliersFilter;