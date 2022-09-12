import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Icons } from "./Constants";

const NewFilterLine = ({ width, title, temporaryFilter, currentFilter, icon, command, deleteCommand }) => {
    const HEIGHT = width * .1;
    //console.log("Ekranda yazan: ", currentFilter, " ", temporaryFilter)
    return (
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: .5, borderColor: 'darkgray', alignItems: 'center' }}>
            <Text style={[styles.headerTitle, { flex: .4, paddingLeft: HEIGHT / 3 }]}>{title}</Text>
            <Text style={styles.headerTitle}> : </Text>

            <TouchableOpacity
                style={{ flex: .5 }}
                onPress={command}
            >
                {
                    currentFilter ? (
                        <Text style={styles.currentFilter} numberOfLines={1} ellipsizeMode={'tail'}>{currentFilter}</Text>
                    ) : (
                        <Text style={styles.filterTitle}>{temporaryFilter}</Text>
                    )
                }
            </TouchableOpacity>

            <View style={{ flex: .1, paddingLeft: 3 }}>
                {
                    currentFilter ? (
                        <TouchableOpacity style={styles.iconView} onPress={() => deleteCommand()}>
                            <Image source={Icons.cancel} style={[styles.icon, { tintColor: null }]} />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.iconView}>
                            <Image source={icon} style={[styles.icon, {}]} />
                        </View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    filterTitle: {
        fontSize: 14,
        color: '#8C8C8C',
        textAlign: 'right',
        textAlignVertical: 'center',
        textDecorationLine: 'underline',
    },
    icon: {
        width: 30 / 2,
        height: 30 / 2,
        tintColor: '#7D7D7D',
    },
    iconView: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentFilter: {
        fontSize: 14,
        color: 'black',
        textAlign: 'right',
        textAlignVertical: 'center',
        marginLeft: 10,
    }
})

export default NewFilterLine;