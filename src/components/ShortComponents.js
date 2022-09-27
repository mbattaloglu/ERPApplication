import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { StylesAll } from "./Constants";

const NoDataScreen = () => {
    return (
        <View style={StylesAll.container} >
            <Text style={{ color: 'black', fontSize: 20 }}>Hiç veri yok</Text>
        </View>
    )
}

const LoadingScreen = ({ color }) => {
    return (
        <ActivityIndicator
            style={{ flex: 1 }}
            color={color}
            size={'large'}
        />
    )
}

export { NoDataScreen, LoadingScreen }