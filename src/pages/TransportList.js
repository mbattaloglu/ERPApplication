import React, { useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, Image } from "react-native";
import TransportBox from "../components/Box/TransportBox";
import { User, Api, Icons } from "../components/Constants";
import TotalBox from "../components/TotalBox";
import Filter from "./Filter";

var i = 0;

const TransportList = ({ navigation }) => {

    function asd() {
        setTimeout(() => {
            setEdit(false)
        }, 2000)
    }

    const [edit, setEdit] = useState(false);
    const [items, setItems] = useState([]);

    const GetData = () => {
        fetch(Api.link + '/odata/TransportCards?$select=Oid,SenderName,DocumentDate,TotalPackingQuantity&$expand=TransportWaybill($select=declarationNumber)&$top=10&$skip=' + i,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => setItems([...items, ...res.value]))
            .then(i = i + 10)
    }

    useEffect(() => {
        GetData();
    }, [])

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            {edit ? (
                <View>

                </View>
            ) : (
                <View style={{ alignItems: 'center' }}>
                    <FlatList // Do it: VirtualizeList
                        data={items}
                        onEndReached={() => GetData()}
                        onEndReachedThreshold={3}
                        renderItem={({ item, index }) => (
                            <TransportBox
                                vehicleNo={item.TransportWaybill.declarationNumber}
                                company={item.SenderName}
                                oid={item.Oid}
                                date={item.DocumentDate.slice(0, 10)} // Not sure
                                packing={item.TotalPackingQuantity}
                                backColor={index % 2 == 0 ? 'darkgray' : 'lightblue'}
                            />
                        )}
                    />
                    {/* <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'tomato', borderRadius: 25 }} onPress={() => [setEdit(true), asd()]} /> */}
                    <TotalBox
                        mainBottom={["Toplam Çuval", ]}
                        mainMiddle={["Toplam KG", ]}
                        mainTop={["Toplam Hacim", ]}
                    />
                </View>
            )}


        </View>
    )
}

export default TransportList;