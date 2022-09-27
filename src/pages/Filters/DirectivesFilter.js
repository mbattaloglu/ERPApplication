import React, { useMemo, useReducer, useState } from "react";
import { View } from "react-native";
import { Icons } from "../../components/Constants";
import NewFilterLine from "../../components/NewFilterLine";

import { EditDate, filterFormat, fuseFilter, fuseFilterDirective } from "../../components/MyFunctions";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import DoubleButton from "../../components/DoubleButton";

const HEIGHT = 90;
var whichDate = '';

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

function FilterReducer(state, action) {
    try {
        switch (action.type) {
            case 'startDate':
                return { ...state, startDate: { ...state.startDate, value: action.data } }
            case 'endDate':
                return { ...state, endDate: { ...state.endDate, value: action.data } }
        }
    }
    catch (err) {
        console.log("HATA: ", err);
        return state
    }
}

const DirectivesFilter = ({ navigation }) => {

    const [state, dispatch] = useReducer(FilterReducer, datas);

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
        console.warn(date);
        hideDatePicker();
        if (whichDate == 'startDate')
            dispatch({ type: 'startDate', data: date })
        else
            dispatch({ type: 'endDate', data: date })
    };

    useMemo(() => {
        console.log("Değişti: ", state)
    }, [state])


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
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View >
            <DoubleButton
                type={'directives'}
                leftCommand={() => navigation.goBack()}
                rightCommand={() => {navigation.navigate("Directives", { filters: filterFormat(fuseFilterDirective(state), ',') }), console.log("STATE: ", filterFormat(fuseFilterDirective(state), ','))}}
            />
        </View>
    )
}

export default DirectivesFilter;