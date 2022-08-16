import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import FilterLine from "../components/Box/FilterLine";
import { Icons, StylesAll } from "../components/Constants";
import DoubleButton from "../components/DoubleButton";

const Filter = ({ onFilter, onCancel }) => {

    const filters = [
        startDate = "",
        endDate = "",
        vehicle = "",
        company = "",
    ]
    

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 220, width: 350, backgroundColor: 'white', paddingHorizontal: 8, borderWidth: 2, margin: 20 }}>
                <View style={{ flex: 1, marginVertical: 4 }}>
                    {/* Start Date */}
                    <FilterLine
                        title={"Başlangıç Tarihi"}
                        defaultInput={"01.05.2022"}
                        onchanged={(value) => { filters[0] = value }}
                        icon={Icons.calendar}
                    />
                    {/* End Date */}
                    <FilterLine
                        title={"Bitiş Tarihi"}
                        defaultInput={"01.05.2022"}
                        onchanged={(value) => { filters[1] = value }}
                        icon={Icons.calendar}
                    />
                    {/* Vehicle */}
                    <FilterLine
                        title={"Araç No"}
                        defaultInput={"P-396/22"}
                        onchanged={(value) => { filters[2] = value }}
                        icon={Icons.search}
                        onTouch={() => {}}
                    />
                    {/* Company */}
                    <FilterLine
                        title={"Firma İsmi"}
                        defaultInput={"SONER ATAKUL"}
                        onchanged={(value) => { filters[3] = value }}
                        icon={Icons.search}
                    />
                </View>
            </View>
            <DoubleButton leftCommand={() => onCancel()} rightCommand={() => onFilter(filters)} />
        </View>
    )
}




export default Filter;