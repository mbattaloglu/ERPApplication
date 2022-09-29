import React, { useEffect, useMemo, useReducer, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { GetSenderNames, GetVehicleNames } from "../../components/ApiFunctions";
import { ThemeColors, User } from "../../components/Constants";
import SearchBar from "../../components/SearchBar";
import { LoadingScreen } from "../../components/ShortComponents";

const datas = {
    data: null,
    constData: null
}

function Reducer(state, action) {
    try {
        switch (action.type) {
            case 'first':
                return { data: action.data, constData: action.data }
            case 'search':
                return { ...state, data: action.data }
            case 'reset':
                return { ...state, data: state.constData }
        }
    } catch (err) {
        console.log("HATAAAAAA")
        return state
    }
}

const FilterDatas = ({ navigation, route }) => {

    const { type, commandData, backPage } = route.params;

    const [state, dispatch] = useReducer(Reducer, datas);

    useMemo(async () => {
        const data = await commandData
        dispatch({ type: 'first', data: data })
    }, [])


    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {
                state.constData ? (
                    <View style={{ justifyContent: 'space-between', height: '100%' }}>
                        <SearchBar
                            holderText={'Firma seçiniz...'}
                            commCallBack={(value) => {
                                dispatch({
                                    type: 'search',
                                    data: state.constData.filter(function (e) {
                                        return e[type].toLowerCase().indexOf(value?.toLowerCase()) >= 0
                                    })
                                })
                            }}
                            resetCallBack={() => dispatch({type: 'reset'})}
                        />
                        <FlatList
                            data={state.data}
                            key={(index) => index}
                            onEndReachedThreshold={.5}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        height: 50,
                                        borderBottomWidth: .5,
                                        borderColor: 'darkgray',
                                        justifyContent: 'center',
                                        paddingLeft: 10
                                    }}
                                    onPress={() => [navigation.navigate(backPage, { type: type, data: item[type] })]}
                                >
                                    <Text style={{ fontSize: 17, color: '#343a40', fontWeight: '400' }}>{item.SenderName || item.declarationNumber}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                ) : (
                    <LoadingScreen color={ThemeColors.transportList.SubHeaderBar} />
                )
            }
        </View>
    )
}



export default FilterDatas;