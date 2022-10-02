import React from "react";
import { View } from "react-native";

import { filterFormat, fuseFilter } from "../../components/MyFunctions";

import DoubleButton from "../../components/DoubleButton";
import { GetSenderNames, GetVehicleNames } from "../../components/ApiFunctions";

import InputLine from "../../components/InputLine";
import { ThemeColors } from "../../components/Constants";

const TransportFilter = ({ navigation, route }) => {

    const datas = {
        startDate: {
            name: 'DocumentDate',
            value: undefined,
            process: 'ge'
        },
        endDate: {
            name: 'DocumentDate',
            value: undefined,
            process: 'le'
        },
        vehicle: {
            name: 'TransportWaybill/declarationNumber',
            value: '',
            string: true,
            process: 'eq'
        },
        company: {
            name: 'SenderName',
            value: '',
            string: true,
            process: 'eq'
        },
    }

    console.log(route.params)

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

            <InputLine
                title={'Araç No'}
                tempValue={'Araç seçiniz'}
                type={'Seç'}
                currValue={route.params?.declarationNumber}
                changeData={(value) => datas.vehicle.value = `'${value}'`}
                deleteData={() => navigation.setParams({ declarationNumber: null })}
                command={() => navigation.navigate('FilterDatas', { type: 'declarationNumber', commandData: GetVehicleNames(), backPage: 'TransportFilter', color: ThemeColors.transportList.SubHeaderBar })}
            />

            <InputLine
                title={'Firma'}
                tempValue={'Firma seçiniz'}
                type={'Seç'}
                currValue={route.params?.SenderName}
                changeData={(value) => datas.company.value = `'${value}'`}
                deleteData={() => navigation.setParams({ SenderName: null })}
                command={() => navigation.navigate('FilterDatas', { type: 'SenderName', commandData: GetSenderNames(), backPage: 'TransportFilter', color: ThemeColors.transportList.SubHeaderBar })}
            />

            <DoubleButton
                type={'transportList'}
                leftCommand={() => /* navigation.goBack() */console.log(filterFormat(fuseFilter(datas), " and "))}
                rightCommand={() => { navigation.navigate("TransportList", { filters: filterFormat(fuseFilter(datas), " and ") }) }}
            />
        </View>
    )
}

export default TransportFilter;