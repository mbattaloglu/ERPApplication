import React from "react";
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";

const WIDTH = Dimensions.get('window').width;
const BORDER_COLOR = 'darkgray';

const HeaderLine = ({ titles, col }) => {
    return (
        <View style={{ alignItems: 'center', borderColor: BORDER_COLOR }}>
            <View style={{
                flexDirection: 'row',
                borderWidth: .5,
                borderColor: BORDER_COLOR,
                backgroundColor: col,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    titles.map((item, index) => (
                        <View
                            style={
                                [styles.box,
                                {
                                    height: 40,
                                    flex: item.flex ? item.flex : 1,
                                    borderLeftWidth: index != 0 ? .5 : 0
                                }
                                ]
                            }
                            key={index}
                        >
                            <Text style={styles.textStyle}>{item.text}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const MiddleLine = ({ items, onEnd, boxStyles, canClick, command }) => {
    console.log(Object.keys(items).length)
    return (
        <View style={{ alignItems: 'center' }}>
            <FlatList
                data={items}
                onEndReached={() => onEnd()}
                onEndReachedThreshold={.5}
                //keyExtractor={(item, index) => index + Date.now() + Math.random()}
                renderItem={({ item, index }) => (
                    <Box
                        items={item}
                        boxStyles={boxStyles}
                        lineColor={index % 2 == 0 ? '#FEFFFF' : '#f8f9fa'}
                        command={(oid)=> command(oid)}
                        canClick={canClick}
                    />
                )}
            />

        </View>
    )
}


const Box = ({ items, lineColor, boxStyles, canClick, command }) => {
    var l = Object.keys(boxStyles).length;

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                backgroundColor: lineColor,
                alignItems: 'center',
                justifyContent: 'center',
                width: WIDTH
            }}
            disabled={!canClick}
            onPress={() => command(items[0][2].title)}
        >
            {
                items[0].map((item, index) => {
                    var i = index % l;
                    return (
                        <View style={[styles.box, { flex: boxStyles[i].flex ? boxStyles[i].flex : 1, borderLeftWidth: index != 0 ? .5 : 0, borderBottomWidth: .5, borderColor: BORDER_COLOR }]} key={index}>
                            <Text style={{
                                fontSize: 13,
                                color: items[1]?.color ? items[1]?.color : 'black',
                                textAlign: boxStyles[i].textAlign ? boxStyles[i].textAlign : 'center',
                                paddingHorizontal: 5,
                                textAlignVertical: 'center',
                            }}
                                numberOfLines={boxStyles[i].numberOfLines ? boxStyles[i].numberOfLines : 1}
                                ellipsizeMode={boxStyles[i].ellipsizeMode ? boxStyles[i].ellipsizeMode : 'tail'}
                            >{item.title}</Text>
                        </View>
                    )
                })
            }
        </TouchableOpacity>
    )
}

const BottomLine = ({ items, col }) => {
    return (

        <View style={{ flexDirection: 'row', backgroundColor: col, borderWidth: .5, borderColor: BORDER_COLOR }}>
            {
                items.map((item, index) => (
                    <View style={{ flex: 1, borderLeftWidth: index != 0 ? .5 : 0, borderColor: BORDER_COLOR }} key={index}>

                        <View style={{ height: 30, justifyContent: 'center', borderBottomWidth: .5, borderColor: BORDER_COLOR }}>
                            <Text style={styles.textStyle}>{item.text}</Text>
                        </View>

                        <View style={{ height: 30, justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>{item.amount}</Text>
                        </View>

                    </View>
                ))
            }
        </View>
    )
}

const EditDatas = ({ datas }) => {
    if (typeof (datas) != Object) {
        console.log("HATA: Girilen veri bir obje değil.")
        return null;
    }
    var newData = [];
    let l = Object.keys(datas)
    for (let i = 0; i < l; i++) {
        const temp = datas[i];
        newData.push(
            [
                {
                    title: cc.DocumentDate,
                },
                {
                    title: cc.SenderName,
                },
                {
                    title: cc.Oid,
                },
                {
                    title: cc.TransportWaybill.declarationNumber,
                },
                {
                    title: cc.TotalPackingQuantity,
                },

            ]
        )
    }
    return newData;
}


const styles = StyleSheet.create({
    box: {
        height: 70,
        flex: 1,
        justifyContent: 'center',
        borderColor: BORDER_COLOR
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        fontWeight: '600'
    },
})

export { HeaderLine, MiddleLine, BottomLine, EditDatas };