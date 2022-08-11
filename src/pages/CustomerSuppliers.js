import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import SuppliersBox from "../components/Box/SuppliersBox";
import TotalBox from "../components/TotalBox";
import { User } from "../components/Constants";

var i = 0;

const CustomerSuppliers = ({ navigation }) => {

    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalBakiye, setTotalBakiye] = useState(0);

    const GetTotal = async () => {
        try {
            const list = await fetch('http://193.53.103.178:5312/api/odata/CustomerSuppliers?$expand=FinancialTrxs($select=Debit,Credit)&$select=FinancialTrxs', {
                method: 'GET', /* or POST/PUT/PATCH/DELETE */
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(res => res.value[0])
                .then(res => res.FinancialTrxs)
                .catch((err) => console.log("Hata: ", err));
            let l = list.length;
            let debit = 0;
            let credit = 0;
            for (let i = 0; i < l; i++) {
                debit += list[i].Debit;
                credit += list[i].Credit;
            }
            setTotalDebit(debit);
            setTotalCredit(credit);
            setTotalBakiye(debit - credit);
        } catch (e) {
            alert(e);
        }
    }

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
        GetTotal();
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
                        mainTop={["Borcu", totalDebit]}
                        mainMiddle={["Alacağı", totalCredit]}
                        mainBottom={["Bakiye", totalBakiye]}
                    />
                </View>
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Yükleniyor...</Text>
                </View>
            )}


        </View>
    )
}

export default CustomerSuppliers;