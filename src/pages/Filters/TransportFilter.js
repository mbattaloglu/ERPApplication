import React, { useMemo, useReducer, useState } from "react";
import { View } from "react-native";
import { Icons } from "../../components/Constants";
import NewFilterLine from "../../components/NewFilterLine";

import { EditDate, filterFormat, fuseFilter, OdataFilterFormat } from "../../components/MyFunctions";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import DoubleButton from "../../components/DoubleButton";

const HEIGHT = 180;
var whichDate = '';

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

function FilterReducer(state, action) {
    try {
        switch (action.type) {
            case 'startDate':
                return { ...state, startDate: { ...state.startDate, value: action.data } }
            case 'endDate':
                return { ...state, endDate: { ...state.endDate, value: action.data } }
            case 'vehicle':
                return { ...state, vehicle: { ...state.vehicle, value: action.data ? `'${action.data}'` : undefined } }
            case 'company':
                return { ...state, company: { ...state.company, value: action.data ? `'${action.data}'` : undefined } }
        }
    }
    catch (err) {
        console.log("HATA: ", err);
        return state
    }
}

const TransportFilter = ({ navigation, route }) => {

    const [state, dispatch] = useReducer(FilterReducer, datas);

    useMemo(() => {
        if (route.params?.vehicle) {
            dispatch({ type: 'vehicle', data: route.params.vehicle })
        }
        if (route.params?.company) {
            dispatch({ type: 'company', data: route.params.company })
        }
    }, [route.params])

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = (whichDate2) => {
        whichDate = whichDate2
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        date = JSON.stringify(date)?.slice(1, 11)
        console.warn(date)
        hideDatePicker();
        if (whichDate == 'startDate')
            dispatch({ type: 'startDate', data: date })
        else
            dispatch({ type: 'endDate', data: date })

    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 30, marginTop: 20, height: HEIGHT }}>
                <NewFilterLine
                    width={300}
                    title={'Başlangıç Tarihi'}
                    temporaryFilter={'Tarih seçiniz'}
                    currentFilter={EditDate(state.startDate.value)}
                    icon={Icons.calendar}
                    command={() => { showDatePicker('startDate') }}
                    deleteCommand={() => dispatch({ type: 'startDate', data: undefined })}
                />
                <NewFilterLine
                    width={300}
                    title={'Bitiş Tarihi'}
                    temporaryFilter={'Tarih seçiniz'}
                    currentFilter={EditDate(state.endDate.value)}
                    icon={Icons.calendar}
                    command={() => { showDatePicker('endDate') }}
                    deleteCommand={() => dispatch({ type: 'endDate', data: undefined })}
                />
                <NewFilterLine
                    width={300}
                    title={'Araç No'}
                    temporaryFilter={'Araç seçiniz'}
                    currentFilter={state.vehicle.value?.slice(1, state.vehicle.value.length - 1)}
                    icon={Icons.search}
                    command={() => navigation.navigate('FilterDatas', { type: 'vehicle' })}
                    deleteCommand={() => dispatch({ type: 'vehicle', data: undefined })}
                />
                <NewFilterLine
                    width={300}
                    title={'Firma'}
                    temporaryFilter={'Firma seçiniz'}
                    currentFilter={state.company.value?.slice(1, state.company.value.length - 1)}
                    icon={Icons.search}
                    command={() => navigation.navigate('FilterDatas', { type: 'company' })}
                    deleteCommand={() => dispatch({ type: 'company', data: undefined })}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View >
            <DoubleButton
                type={'transportList'}
                leftCommand={() => navigation.goBack()}
                rightCommand={() => { navigation.navigate("TransportList", { filters: filterFormat(fuseFilter(state), " and ") }) }}
            />
        </View>
    )
}

export default TransportFilter;