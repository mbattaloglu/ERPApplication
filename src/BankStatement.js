import React, { useEffect } from "react";
import { View } from "react-native";
import { User } from './constants/Constants';

const BankStatement = ({ navigation }) => {

    useEffect(() => {
        fetch('http://193.53.103.178:5312/api/odata/TransportCards?$top=5&', {
            headers: {
                'Authorization': 'Bearer ' + User.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => res.value)
            .then(console.log);
        console.log(User.token);
        navigation.goBack();
    }, [])

    return (
        <View>

        </View>
    )
}

export default BankStatement;