import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { Icons, StylesAll, ThemeColors } from "./Constants";

const BORDER_COLOR = 'darkgray';

const HEIGHT = Dimensions.get('window').height;
const totalBox = HEIGHT * 8.5 / 35

const DataScreen = ({ items, onEnd, itemStyles, canClick, command, titles, boxStyles, feetComp }) => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={items.lists}
                onEndReached={() => onEnd()}
                onEndReachedThreshold={.5} // TODO: Calculate this
                ListFooterComponent={feetComp}
                //TODO: Add key, if it necessary
                renderItem={({ item, index }) => {
                    return (
                        (
                            <Box
                                items={item}
                                itemStyles={itemStyles}
                                lineColor={index % 2 == 0 ? '#FEFFFF' : '#f8f9fa'}
                                canClick={canClick}
                                command={(oid) => command(oid)}
                                titles={titles}
                                boxStyles={boxStyles}
                            />
                        )
                    )
                }}
            />
            {/* <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                    marginHorizontal: '7%',
                    alignSelf: 'center'
                }}>
                {
                    type == 'Directives' && <AddButon addCommand={addCommand} />
                }
                <OpenScreen items={[items.totals, items.listDetails]} color={color} />
            </View> */}

        </View>
    )
}

const AddButon = ({ addCommand }) => {
    return (
        <TouchableOpacity
            style={{ alignSelf: 'center', marginBottom: 5 }}
            onPress={addCommand}
        >
            <Image source={Icons.plus} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
    )
}

const OpenScreen = ({ items, color }) => {
    const [active, setActive] = useState(false)
    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setActive(!active)}
                style={{
                    height: HEIGHT * 1.5 / 35,
                    backgroundColor: ThemeColors[color]?.SubHeaderBar,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Image style={{ width: 15, height: 15, tintColor: 'white', transform: [{ rotate: active ? '90deg' : '270deg' }] }} source={Icons.arrow} />
            </TouchableOpacity>
            {
                active && (
                    <View style={{ height: totalBox, borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'lightgray', backgroundColor: 'white' }}>
                        <TotalScreen items={items[0]} />
                        <FilterLine items={items[1]} />
                    </View>
                )
            }
        </>
    )
}

const Box = ({ items, lineColor, itemStyles, canClick, command, titles, boxStyles }) => {
    return (
        <View style={[StylesAll.profileCard, { backgroundColor: lineColor }]}>
            <TouchableOpacity
                disabled={!canClick}
                onPress={() => command(items[0][6].oid)}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        height: boxStyles.height,
                    }}>
                    {/* Sol Kutu */}
                    <View style={{ flex: 1.4 }}>
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
                    <View style={{ flex: 3.5 }}>
                        {
                            items[0].map((item, index) => {
                                if (index == 0 || index == 6)
                                    return;
                                return (
                                    <View
                                        style={{
                                            flex: itemStyles[index]?.flex ? itemStyles[index].flex : 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        key={index}
                                    >
                                        <Text style={{ color: 'black' }}>  :  </Text>
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
                    <View style={{ flex: 1.5 }}>
                        <View style={{ justifyContent: 'space-between', flex: 1 }}>
                            <Text
                                style={{ color: 'black', textAlign: 'right' }}
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
                </View>
            </TouchableOpacity >
        </View>
    )
}


const TotalScreen = ({ items, style }) => {
    return (
        <View style={[StylesAll.profileCard, { paddingHorizontal: 0, justifyContent: 'center' }, style]}>
            <Text style={[styles.headerText, styles.headerTitle, { fontWeight: '700' }]}>- Toplam -</Text>
            <View style={{ flexDirection: 'row' }}>
                {
                    items.map((item, index) => {
                        return (
                            <View style={{ flex: 1, marginTop: 5 }} key={index}>
                                <Text style={[styles.headerText, styles.headerTitle]}>{item.title}</Text>
                                <Text style={[styles.headerText, styles.headerValue, { marginTop: 5, color: item.color || 'black' }]}>{item.value}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

const FilterLine = ({ items }) => {
    return (
        <View style={[StylesAll.profileCard, { flex: 1, flexDirection: 'row' }]}>
            <View style={StylesAll.container}>
                <Text style={[styles.headerText, styles.headerTitle]}>Filtre</Text>
                <Text style={[styles.headerText, styles.headerValue]}>{items.filter ? 'Var' : 'Yok'}</Text>
            </View>
            <View style={StylesAll.container}>
                <Text style={[styles.headerText, styles.headerTitle]}>Sonuç</Text>
                <Text style={[styles.headerText, styles.headerValue]}>{items.amount}</Text>
            </View>
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
    },
    headerText: {
        fontSize: 14,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    headerTitle: {
        fontWeight: '500',
        color: '#323232'
    },
    headerValue: {
        fontWeight: '400',
        color: '#444444',
    },
})

export { DataScreen, TotalScreen, EditDatas, AddButon, OpenScreen };