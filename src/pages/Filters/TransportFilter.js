import React, { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { StyleSheet, View, Modal, Text, TouchableHighlight, Platform } from "react-native";
import { Icons, User } from "../../components/Constants";
import NewFilterLine from "../../components/NewFilterLine";

import { EditDate, OdataFilterFormat } from "../../components/MyFunctions";

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
                return { ...state, vehicle: { ...state.vehicle, value: action.data } }
            case 'company':
                return { ...state, company: { ...state.company, value: action.data } }
        }
    }
    catch (err) {
        console.log("HATA: ", err);
        return state
    }
}

const TransportFilter = ({ navigation, route }) => {

    const [state, dispatch] = useReducer(FilterReducer, datas);

    useEffect(() => {
        console.log("HEY: ", state.company.value);
    }, [state])

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
        date = EditDate(JSON.stringify(date)?.slice(1, 11))
        console.warn(date);
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
                    currentFilter={state.startDate.value}
                    icon={Icons.calendar}
                    command={() => { showDatePicker('startDate') }}
                    deleteCommand={() => dispatch({type: 'startDate', data: undefined})}
                />
                <NewFilterLine
                    width={300}
                    title={'Bitiş Tarihi'}
                    temporaryFilter={'Tarih seçiniz'}
                    currentFilter={state.endDate.value}
                    icon={Icons.calendar}
                    command={() => { showDatePicker('endDate') }}
                    deleteCommand={() => dispatch({type: 'endDate', data: undefined})}
                />
                <NewFilterLine
                    width={300}
                    title={'Araç No'}
                    temporaryFilter={'Araç seçiniz'}
                    currentFilter={state.vehicle.value}
                    icon={Icons.search}
                    command={() => dispatch({type: 'vehicle', data: undefined})}
                />
                <NewFilterLine
                    width={300}
                    title={'Firma'}
                    temporaryFilter={'Firma seçiniz'}
                    currentFilter={state.company.value}
                    icon={Icons.search}
                    command={() => navigation.navigate('FilterDatas', { type: 'company' })}
                    deleteCommand={() => dispatch({type: 'company', data: undefined})}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View >
            <DoubleButton
                leftCommand={() => navigation.goBack()}
                rightCommand={() => navigation.navigate("TransportList", { filters: OdataFilterFormat('&', state) })}
            />
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