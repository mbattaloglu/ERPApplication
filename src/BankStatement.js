import React, { useEffect } from "react";
import { View } from "react-native";
import { User } from './constants/Constants';

const BankStatement = ({ navigation }) => {

    useEffect(() => {
        fetch('http://193.53.103.178:5312/api/odata/TransportCards?$top=1&$select=oid', {
            
            headers: {
                'Authorization': 'Bearer ' + User.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => res.value)
            .then(console.log);
        navigation.goBack();
    }, [])

    return (
        <View>

        </View>
    )
}

export default BankStatement;