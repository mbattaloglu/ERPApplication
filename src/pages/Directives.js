import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import DirectivesBox from "../components/Box/DirectivesBox";
import { User, Api } from "../components/Constants";
import TotalBox from "../components/TotalBox";

var i = 0;

const Directives = () => {

    const [items, setItems] = useState([]);

    const GetData = () => {
        fetch(Api.link + '/odata/TransportPaymentDirectives?$top=10&$skip=' + i,
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
            <FlatList
                data={items}
                onEndReached={() => GetData()}
                onEndReachedThreshold={3}
                renderItem={({ item, index }) => (
                    <DirectivesBox
                        date={item.Date.slice(0, 10)}
                        desc={item.Desc}
                        directiveNo={item.Code}
                        unit={"Bilinmiyor"} // Manual !!!!!
                        directiveAmount={parseFloat(item.Amount).toLocaleString()} 
                        paymentStatus={item.TPDPaymentStatus == 'Paid' ? 'Onaylı' : 'Onaysız'}
                        backColor={index % 2 == 0 ? 'darkgray' : 'lightblue'}
                    />
                )}
            />
            <TotalBox
                mainBottom={"Onay Bekleyen"}
                mainMiddle={"Onaylanan"}
                mainTop={"Ödenen"}
            />

        </View>
    )
}

export default Directives;