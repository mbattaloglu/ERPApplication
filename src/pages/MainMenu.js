import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MainButton from "../components/MainButton";
import { Images, Icons, Api, User } from "../components/Constants";

const MainMenu = ({ navigation }) => {

    const [info, setInfo] = useState([]);

    const getInfo = async() => {
        await fetch(Api.link + '/odata/CustomerSuppliers', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + User.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => setInfo(...res.value))
    }

    useEffect(() => {
        getInfo();
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {/* Logo */}
            <View>
                <Image source={Images.LogoImage} style={styles.logo} />
            </View>

            {/* User */}
            <View style={styles.userLine}>
                <Image source={Icons.user} style={styles.userLogo} />
                <Text style={styles.userText}>{info.Code} {info.Name}</Text>
            </View>

            {/* Buttons */}
            <View>
                <MainButton title={"Müşteri Sevk Listesi"} color={"#80C342"} command={() => navigation.navigate("TransportList")} />
                <MainButton title={"Talimatlarım"} color={"#FFC60B"} command={() => navigation.navigate("Directives")} />
                <MainButton title={"Hesap Ektresi"} color={"#68CEEF"} command={() => navigation.navigate("BankStatement")} />
                <MainButton title={"Ayarlar"} color={"#F1592A"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 300,
        alignSelf: 'center'
    },
    userLine: {
        marginVertical: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userLogo: {
        height: 58,
        width: 42
    },
    userText: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
        height: 150,
        width: 250,
        textAlignVertical: 'center'
    }
})

export default MainMenu;