import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import DirectivesBox from "../components/Box/DirectivesBox";
import { User, Api } from "../components/Constants";
import TotalBox from "../components/TotalBox";

var i = 0;
// http://193.53.103.178:5312/api/odata/TransportPaymentDirectives/97209/GetCustomerTransportPaymentDirective(Date>'2022-01-01 00:00:00' & Date<'2022-01-31 23:59:59')
const Directives = () => {

    const [items, setItems] = useState([]);

    const GetData = () => {
        fetch(Api.link + '/odata/TransportPaymentDirectives?$filter=CustomerSupplier/Oid eq 97209 &$orderby=Date&$select=Date,Desc,Code,Amount,TPDPaymentStatus&$top=10&$skip=' + i,
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
        <View style={{ flex: 1 }}>
            {items.length > 0 ? (
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
                        mainTop={["Onay Bekleyen",]}
                        mainMiddle={["Onaylanan",]}
                        mainBottom={["Ödenen",]}
                    />

                </View>
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize:20 }}>Yükleniyor...</Text>
                </View>
            )}

        </View>
    )
}

export default Directives;