import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { BottomLine } from "../components/NewConst";
import { ThemeColors, Icons, Api, User } from "../components/Constants";
import { toAmount } from "../components/ConstFunctions";

const TransportDetails = ({ route }) => {

    const [ready, setReady] = useState(false);

    const [items, setItems] = useState({});
    const [activePage, setActivePage] = useState(false);

    useEffect(() => {
        getDetails();
    }, [])

    useEffect(() => {
        if (!ready && Object.keys(items).length > 0) {
            setReady(true);
        }
        console.log("Sayfa yenilenmiş.")
    }, [items])

    const bottomInfos = [
        {
            text: 'Nakliyeci',
            amount: items?.TransportShipperPlate?.Plate
        },
        {
            text: 'Toplam Ambalaj',
            amount: items?.TotalPackingQuantity
        },
        {
            text: 'Toplam KG',
            amount: items?.TotalWeight
        },
        {
            text: 'Toplam Hacim',
            amount: items?.CalculatedTotalVolume
        },
    ]

    const getDetails = () => {
        fetch
            (
                (
                    Api.link +
                    '/odata/TransportCards/' + route.params.oid + '?$select=DocumentDate,ShipmentDate,SenderName,TotalPackingQuantity,TotalWeight,CalculatedTotalVolume' +
                    '&$expand=SenderBranch($select=BranchName),' +
                    'ReceiverBranch($select=BranchName),' +
                    'TransportWaybill($select=declarationNumber),' +
                    'TransportCardDetails($expand=TransportProduct($select=Name),' +
                    'TransportUnitMultiplier($select=Name);$select=PackingQuantity,Quantity,Weight,Volume),' +
                    'TransportCardIncomes($expand=CurrencyType($select=Name);$select=IncomePaymentType,Amount),' +
                    'TransportShipperPlate($select=Plate)'
                ),
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + User.token,
                        'Content-Type': 'application/json'
                    },
                }
            )
            .then(res => res.json())
            .then(res => setItems(res))
            .catch((err) => console.log(err))
        console.log("Bitti")
    }

    return (
        <View style={{ flex: 1 }}>
            {
                ready ? (
                    <>
                        <ScrollView style={{ flex: 1 }}>
                            <Header items={items}/>
                            <View style={{ marginTop: 25 }}>
                                <SwitchButton onClick={(bool) => setActivePage(bool)} />
                                {
                                    activePage ? (
                                        <>
                                            <TransportItems items={items.TransportCardDetails} />
                                        </>
                                    ) : (
                                        <>
                                            <Services items={items.TransportCardIncomes}/>
                                        </>
                                    )
                                }
                            </View>
                        </ScrollView>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <BottomLine items={bottomInfos} col={ThemeColors.transportList.SubHeaderBar} />
                        </View>
                    </>
                ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Yükleniyor...</Text>
                    </View>
                )
            }
        </View>
    )
}

const Header = ({ items }) => {
    return (
        <View style={{ marginVertical: 20 }}>
            <Box title={"Kabul Tarihi"} desc={items.DocumentDate.slice(0,10)} />
            <Box title={"Sevk Tarihi"} desc={items.ShipmentDate.slice(0,10)} />
            <Box title={"Gönderen Şube"} desc={items.SenderBranch.BranchName} />
            <Box title={"Alıcı Şube"} desc={items.ReceiverBranch.BranchName} />
            <Box title={"Araç No"} desc={items.TransportWaybill.declarationNumber} />
            <Box title={"Firma Bilgisi"} desc={items.SenderName} />
        </View>
    )
}



const TransportItems = ({ items }) => {

    const [page, setPage] = useState(0);
    var maxPage = items.length - 1;

    return (
        <View style={{}}>
            <Box title={"Ürün Cinsi"} desc={items[page].TransportProduct.Name} />
            <Box title={"Ambalaj"} desc={items[page].PackingQuantity} />
            <Box title={"Birimi"} desc={items[page].TransportUnitMultiplier.Name} />
            <Box title={"Adet"} desc={items[page].Quantity} />
            <Box title={"Kg"} desc={items[page].Weight} />
            <Box title={"Hacim"} desc={items[page].Volume} />
            <Prev_Next command={(val) => setPage(page + val)} page={page} maxPage={maxPage}/>
        </View>
    )
}

const Services = ({ items }) => {

    const [page, setPage] = useState(0);
    var maxPage = items.length - 1;

    return (
        <View style={{}}>
            <Box title={"Tahsilat Tipi"} desc={items[page].IncomePaymentType} />
            <Box title={"Hizmet Kalemi"} desc={""} />
            <Box title={"Döviz Tipi"} desc={items[page].CurrencyType.Name} />
            <Box title={"Hizmet Tutarı"} desc={toAmount(items[page].Amount.toFixed(2))} />
            <Prev_Next command={(val) => setPage(page + val)} page={page} maxPage={maxPage}/>
        </View>
    )
}

const Prev_Next = ({command, page, maxPage}) => {
    return (
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => command(-1)} disabled={page == 0}>
                <Image source={Icons.next} style={[styles.arrows, { transform: [{ rotate: '180deg' }], tintColor: page == 0 ? '#adb5bd' : '#495057' }]} />
            </TouchableOpacity>

            <View style={styles.pagesBox}>
                <Text style={styles.pagesText}>{page + 1} / {maxPage + 1}</Text>
            </View>

            <TouchableOpacity onPress={() => command(1)} disabled={page == maxPage}>
                <Image source={Icons.next} style={[styles.arrows, { tintColor: page == maxPage ? '#adb5bd' : '#495057'}]} />
            </TouchableOpacity>
        </View>
    )
}

const Box = ({ title, desc }) => {
    return (
        <View style={{ flexDirection: 'row', height: 30, marginBottom: 2 }}>
            <View style={[styles.boxStyle, { flex: 1 }]}>
                <Text style={styles.textStyle}>{title}</Text>
            </View>
            <View style={[styles.boxStyle, { flex: 2, borderLeftWidth: .5, borderColor: 'gray' }]}>
                <Text style={[styles.textStyle, { textAlign: 'right' }]}>{desc}</Text>
            </View>
        </View>
    )
}

const SwitchButton = ({ onClick }) => {
    const [keySwitch, setKeySwitch] = useState(false);
    console.log(keySwitch ? 'Sevk Kalemleri' : 'Hizmetler');
    return (
        <View style={{ flexDirection: 'row' }}>

            {/* false */}
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => { keySwitch ? [setKeySwitch(false), onClick(false)] : null }}
                disabled={!keySwitch}
            >
                <View style={[styles.switchBox, { opacity: keySwitch ? .4 : 1 }]}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>HİZMETLER</Text>
                </View>
            </TouchableOpacity>

            {/* true */}
            <TouchableOpacity
                style={{ flex: 1, marginLeft: 2 }}
                onPress={() => { keySwitch ? null : [setKeySwitch(true), onClick(true)] }}
                disabled={keySwitch}
            >
                <View style={[styles.switchBox, { opacity: keySwitch ? 1 : .4 }]}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>SEVK KALEMLERİ</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14.5,
        fontWeight: '500',
        color: 'black',
        paddingHorizontal: 8
    },
    boxStyle: {
        borderBottomWidth: .5,
        borderTopWidth: .5,
        borderColor: 'gray',
        justifyContent: 'center',
    },
    arrows: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    pagesBox: {
        height: 30,
        width: 70,
        borderWidth: .5,
        borderRadius: 15,
        borderColor: 'gray',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagesText: {
        color: 'gray',
        fontSize: 15,
        fontWeight: '500'
    },
    switchBox: {
        height: 35,
        backgroundColor: ThemeColors.transportList.SubHeaderBar,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
})

export default TransportDetails;