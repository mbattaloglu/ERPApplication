import React from "react";
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Image } from "react-native";

const WIDTH = Dimensions.get('window').width;
const BORDER_COLOR = 'darkgray';

const MiddleLine = ({ items, onEnd, itemStyles, canClick, command, titles, boxStyles }) => {
    console.log(Object.keys(items).length)
    return (
        <View style={{ alignItems: 'center' }}>
            <FlatList
                data={items}
                onEndReached={() => onEnd()}
                onEndReachedThreshold={.5} // TODO: Calculate this
                //TODO: Add loading text
                //TODO: Add key, if it necessary
                renderItem={({ item, index }) => {
                    return (
                        (
                            <Box
                                items={item}
                                itemStyles={itemStyles}
                                lineColor={index % 2 == 0 ? '#FEFFFF' : '#f8f9fa'}
                                command={(oid) => command(oid)}
                                canClick={canClick}
                                titles={titles}
                                boxStyles={boxStyles}
                            />
                        )
                    )
                }

                }
            />

        </View>
    )
}


const Box = ({ items, lineColor, itemStyles, canClick, command, titles, boxStyles }) => {
    var l = Object.keys(itemStyles).length;

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                backgroundColor: lineColor,
                alignItems: 'center',
                marginTop: 13,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                width: WIDTH,
                height: boxStyles.height,
                borderTopWidth: .5,
                borderBottomWidth: .5,
                borderColor: BORDER_COLOR
            }}
            disabled={!canClick}
            onPress={() => command(items[0][1].title)}
        >
            {/* Sol Kutu */}
            <View>
                {
                    titles.map((item, index) => {
                        if (index == 0)
                            return;
                        return (
                            <View
                                style={{
                                    flex: itemStyles[index]?.flex ? itemStyles[index].flex : 1,
                                    justifyContent: 'center'
                                }}
                                key={index}
                            >
                                <Text
                                    style={{ fontWeight: '500', color: 'black' }}
                                >{item.text ? item.text : items[0][index]?.mainTitle}</Text>
                            </View>
                        )
                    })
                }
            </View>

            {/* Orta */}
            <View style={{ flex: 1 }}>
                {
                    items[0].map((item, index) => {
                        if (index == 0)
                            return;
                        return (
                            <View
                                style={{
                                    flex: itemStyles[index]?.flex ? itemStyles[index].flex : 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                key={index}
                            >
                                <Text>  :  </Text>
                                <Text
                                    style={{ color: item?.color ? item.color : 'black', flex: 1 }}
                                    numberOfLines={itemStyles[index]?.numberOfLines ? itemStyles[index].numberOfLines : 1}
                                >{item.title}</Text>
                            </View>
                        )
                    })
                }
            </View>
            {/* Sağ Kutu */}
            <View>
                <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <Text
                        style={{ color: 'black' }}
                    >{items[0][0].title}</Text>
                    {
                        boxStyles?.icon ? (
                            <Image source={boxStyles.icon} style={styles.icon} />
                        ) : (
                            null
                        )
                    }
                </View>
            </View>

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
    icon: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        marginBottom: 10,
        tintColor: '#343a40'
    }
})

export { MiddleLine, BottomLine, EditDatas };