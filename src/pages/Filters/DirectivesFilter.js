import React from "react";
import { View } from "react-native";

import { filterFormat, fuseFilterDirective } from "../../components/MyFunctions";

import DoubleButton from "../../components/DoubleButton";
import InputLine from "../../components/InputLine";

const DirectivesFilter = ({ navigation }) => {

    const datas = {
        startDate: {
            name: 'startTime',
            value: undefined,
            process: 'ge'
        },
        endDate: {
            name: 'endTime',
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
                type={'directives'}
                leftCommand={() => navigation.goBack()}
                rightCommand={() => { navigation.navigate("Directives", { filters: filterFormat(fuseFilterDirective(datas), ',') }) }}
            />
        </View>
    )
}

export default DirectivesFilter;