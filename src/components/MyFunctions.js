import React from "react";

function SortingCustomer(a, b) {
    return a.DocumentDate - b.DocumentDate;
}

function EditDate(currDate) {
    var newDate = '';
    try {
        if (!currDate)
            return newDate
        let tempDate = currDate.split("-");
        newDate = tempDate[2] + '.' + tempDate[1] + '.' + tempDate[0];
    }
    catch (err) {
        console.log(`HATA: ${err}`)
    }
    return newDate;
}

function unEditDate(currDate) {
    var newDate = '';
    try {
        if (!currDate)
            return newDate
        let tempDate = currDate.split(".");
        newDate = tempDate[2] + '-' + tempDate[1] + '-' + tempDate[0];
    }
    catch (err) {
        console.log(`HATA: ${err}`)
    }
    return newDate;
}

const Reducer = (state, action) => {
    try {
        switch (action.type) {
            case "first":
                return {
                    lists: action.lists, totals: state.totals.map((item, index) => {
                        return { ...item, amount: action.totals[index] || 0 }
                    }), noData: action.lists.length == 0
                }
            case "add":
                return { ...state, lists: [...state.lists, ...action.lists], noData: action.lists.length == 0 }
            default:
                return state;
        }
    }
    catch (err) {
        console.log(err);
        return state;
    }
}

function OdataFilterFormat(headerChar, datas) { // SORUNLU
    var filterText = '';
    Object.values(datas).map((item) => {
        if (!item.string)
            item.value = unEditDate(item.value)
        else if (item.value)
            item.value = `'${item.value}'`
        if (item.value) {
            if (filterText) {
                filterText += ' and '
            }
            filterText += `${item.name} ${item.process} ${item.value}`
        }
    })
    if (!filterText) {
        console.log("Filtre yok.")
        return ''
    }
    console.log(`${headerChar}$filter=${filterText}`)
    return `${headerChar}$filter=${filterText}`
}

export { SortingCustomer, EditDate, Reducer, OdataFilterFormat, unEditDate };