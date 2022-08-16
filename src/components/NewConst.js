import React from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";

const WIDTH = Dimensions.get('window').width;

const NewConst = () => {

    const titles = [
        {
            text: 'Tarih',
        },
        {
            text: 'Talimat No',
        },
        {
            text: 'Açıklama',
        },
        {
            text: 'Tipi',
        },
        {
            text: 'Tutar',
        },
        {
            text: 'B/A',
            flex: .4
        }
    ]

    const bottomList = [
        {
            text: 'Borcu',
            amount: '123'
        },
        {
            text: 'Alacağı',
            amount: '456'
        },
        {
            text: 'Bakiye',
            amount: '789'
        },
    ]

    const products = [
        [
            {
                title: '2022-05-12',
            },
            {
                title: '134468'
            },
            {
                title: 'VRMNFŞ--008'
            },
            {
                title: 'Virement'
            },
            {
                title: '2,180.00'
            },
            {
                title: 'b',
                flex: .4
            }
        ],
        [
            {
                title: '2022-05-12',
            },
            {
                title: '134468'
            },
            {
                title: 'VRMNFŞ--008'
            },
            {
                title: 'Virement'
            },
            {
                title: '2,180.00'
            },
            {
                title: 'b',
                flex: .4
            }
        ],
    ]

    return (
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <HeaderLine titles={titles} />
            <View style={{ flex: 1 }}>
                <MiddleLine items={products} />
            </View>
            <BottomLine items={bottomList} />
        </View>
    )
}

const HeaderLine = ({ titles }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: '#219ebc', alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={titles}
                    keyExtractor={(item) => item.text}
                    numColumns={Object.keys(titles).length}
                    renderItem={({ item }) => (
                        <View style={[styles.box, item.flex ? { flex: item.flex } : null]}>
                            <Text style={styles.textStyle}>{item.text}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const MiddleLine = ({ items }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center' }}>
                        <Box items={item} />
                    </View>
                )}
            />

        </View>
    )
}


const Box = ({ items }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: 'darkgray', alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={items}
                    keyExtractor={({ index }) => index}
                    numColumns={items.length}
                    style={{width: WIDTH}}
                    renderItem={({ item }) => (
                        <View style={[styles.box, item.flex ? { flex: item.flex } : null]}>
                            <Text style={[styles.textStyle, { fontSize: 9 }]}>{item.title}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const BottomLine = ({ items }) => {
    return (

        <View style={{ flexDirection: 'row', backgroundColor: '#219ebc' }}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.text}
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <View style={{ height: 30, borderWidth: .5, justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>{item.text}</Text>
                        </View>

                        <View style={{ height: 30, borderWidth: .5, justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>{item.amount}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    box: {
        height: 30,
        flex: 1,
        justifyContent: 'center',
        borderLeftWidth: .5,
        borderColor: 'gray' // Renk değiştir
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        fontWeight: '600'
    },

})

export default NewConst;