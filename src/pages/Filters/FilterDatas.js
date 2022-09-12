import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { User } from "../../components/Constants";

const FilterDatas = ({ navigation, route }) => {

    const { type, commandCallBack } = route.params;
    const [datas, setDatas] = useState();

    const GetSenderNames = () => {
        fetch('http://193.53.103.178:5312/api/odata/TransportCards?$apply=groupby((SenderName))',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => setDatas(res.value))
    }

    useMemo(() => {
        if (type == 'company') {
            GetSenderNames();
        }
    }, [])

    return (
        <View style={{backgroundColor: 'white'}}>
            {
                datas ? (
                    <View>
                        <FlatList
                            data={datas}
                            key={(index) => index}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        height: 50,
                                        borderBottomWidth: .5,
                                        borderColor: 'darkgray',
                                        justifyContent: 'center',
                                        paddingLeft: 10
                                    }}
                                    onPress={() => [navigation.navigate('TransportFilter', { company: item.SenderName })]}
                                >
                                    <Text style={{ fontSize: 17, color: '#343a40', fontWeight: '500' }}>{item.SenderName}</Text>
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