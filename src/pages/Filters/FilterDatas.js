import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { User } from "../../components/Constants";
import SearchBar from "../../components/SearchBar";

var allDatas = [];

const FilterDatas = ({ navigation, route }) => {

    const { type, commandCallBack } = route.params;
    const [datas, setDatas] = useState();


    const GetSenderNames = async () => {
        allDatas = await fetch('http://193.53.103.178:5312/api/odata/TransportCards?$apply=groupby((SenderName))',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => res.value)
        setDatas(allDatas)
    }

    const GetVehicleNames = async () => {
        allDatas = await fetch('http://193.53.103.178:5312/api/odata/TransportWaybills?$select=declarationNumber&$orderby=declarationNumber',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => res.value)
        setDatas(allDatas)
    }

    useMemo(() => {
        if (type == 'company') {
            GetSenderNames();
        }
        else if (type == 'vehicle') {
            GetVehicleNames();
        }
    }, [])

    return (
        <View style={{ backgroundColor: 'white' }}>
            {
                allDatas ? (
                    <View style={{ justifyContent: 'space-between', height: '100%' }}>
                        <SearchBar
                            holderText={'Firma seçiniz...'}
                            commCallBack={(value) => {
                                setDatas(allDatas.filter(function (e) {
                                    if (e.SenderName)
                                        return e.SenderName.toLowerCase().indexOf(value?.toLowerCase()) >= 0
                                    else if (e.declarationNumber)
                                        return e.declarationNumber.toLowerCase().indexOf(value?.toLowerCase()) >= 0
                                }
                                ))
                            }}
                            resetCallBack={() => setDatas(allDatas)}
                        />
                        <FlatList
                            data={datas}
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
                                    onPress={() => [navigation.navigate('TransportFilter', item.SenderName ? { company: item?.SenderName } : { vehicle: item.declarationNumber })]}
                                >
                                    <Text style={{ fontSize: 17, color: '#343a40', fontWeight: '400' }}>{item.SenderName || item.declarationNumber}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                ) : (
                    <View></View>
                )
            }
        </View>
    )
}



export default FilterDatas;