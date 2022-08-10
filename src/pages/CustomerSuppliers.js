import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import SuppliersBox from "../components/Box/SuppliersBox";
import TotalBox from "../components/TotalBox";
import { User } from "../components/Constants";

var i = 0;

const CustomerSuppliers = ({ navigation }) => {

    const [items, setItems] = useState([]);

    const GetData = () => {
        fetch('http://193.53.103.178:5312/api/odata/CustomerSuppliers?$expand=FinancialTrxs($orderby=TrxDate;$select=TrxDate,LineDescription,SubType,Oid,Amount;$top=10;$skip=' + i + ')&$select=FinancialTrxs', {
            method: 'GET', /* or POST/PUT/PATCH/DELETE */
            headers: {
                'Authorization': 'Bearer ' + User.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => setItems([...items, ...res.value[0].FinancialTrxs]))
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
                    <SuppliersBox
                        date={item.TrxDate.slice(0, 10)}
                        desc={item.LineDescription}
                        subType={item.SubType}
                        oid={item.Oid}
                        amount={parseFloat(item.Amount).toLocaleString()}
                        paymentStatus={item.TPDPaymentStatus == 'Paid' ? 'Onaylı' : 'Onaysız'}
                        backColor={index % 2 == 0 ? 'darkgray' : 'lightblue'}
                    />
                )}
            />
            <TotalBox
                mainTop={["Borcu",]}
                mainMiddle={["Alacağı"]}
                mainBottom={["Bakiye"]}
            />

        </View>
    )
}

export default CustomerSuppliers;