import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MainButton from "../components/MainButton";
import { Images, Icons } from "../components/Constants";

const MainMenu = () => {
    return (
        <View style={{}}>
            {/* Logo */}
            <View>
                <Image source={Images.LogoImage} style={styles.logo} />
            </View>

            {/* User */}
            <View style={styles.userLine}>
                <Image source={Icons.user} style={styles.userLogo} />
                <Text style={styles.userText}>BS-10 HUSAM ABDULHAMID MIZAL</Text>
            </View>

            {/* Buttons */}
            <View>
                <MainButton title={"Müşteri Sevk Listesi"} color={"#80C342"} />
                <MainButton title={"Talimatlarım"} color={"#FFC60B"} />
                <MainButton title={"Hesap Ektresi"} color={"#68CEEF"} />
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