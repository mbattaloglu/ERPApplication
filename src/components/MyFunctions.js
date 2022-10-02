import { toAmount } from "./ConstFunctions";

function SortingCustomer(a, b) {
    return a.DocumentDate - b.DocumentDate;
}

function EditDate(currDate) {
    try {
        var newDate = '';
        if (!currDate)
            return newDate
        let tempDate = currDate.split("-");
        newDate = tempDate[2] + '.' + tempDate[1] + '.' + tempDate[0];
        return newDate;
    }
    catch (err) {
        console.log(`HATA: ${err}. Konum: EditDate()`)
        return undefined
    }
}

function unEditDate(currDate) {
    try {
        var newDate = '';
        if (!currDate)
            return newDate
        let tempDate = currDate.split(".");
        newDate = tempDate[2] + '-' + tempDate[1] + '-' + tempDate[0];
        return newDate;
    }
    catch (err) {
        console.log(`HATA: ${err}. Konum: unEditDate()`)
        return undefined
    }
}

const Reducer = (state, action) => {
    try {
        switch (action.type) {
            case "add":
                return { ...state, lists: [...state.lists, ...action.lists], noData: action.lists.length < 15 }
            case "first":
                return {
                    lists: action.lists,
                    totals: state.totals.map((item, index) => {
                        return { ...item, value: action.totals[index] || 0 }
                    }),
                    listDetails: { filter: action.filter, amount: action.total },
                    noData: action.lists.length < 15
                }
            case "firstCustomerSuppliers":
                console.log(state.totals[0].color)
                return {
                    lists: action.lists,
                    totals: [
                        {
                            ...state.totals[0],
                            value: toAmount(action.totals[0]),
                        },
                        {
                            ...state.totals[1],
                            value: toAmount(action.totals[1]),
                        },
                        {
                            ...state.totals[2],
                            value: toAmount(Math.abs(action.totals[2])),
                            color: action.totals[2] > 0 ? 'red' : 'green'
                        }
                    ],
                    listDetails: { filter: action.filter, amount: action.total },
                    noData: action.lists.length < 15
                }
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
    console.log(`Komut: ${headerChar}$filter=${filterText}`)
    return `${headerChar}$filter=${filterText}`
}

function fuseFilter(datas) {
    var filterList = [];
    for (let item in datas) {
        if (datas[item].value) {
            filterList.push(`${datas[item].name} ${datas[item].process} ${datas[item].value}`)
        }
    }
    return filterList
}

function fuseFilterDirective(list) {
    var filterList = [];
    for (let item in list) {
        filterList.push(`${list[item].name} ${list[item].process} ${list[item].value ? list[item].value : list[item].name == 'startTime' ? '2022-01-01' : '2022-12-31'}`)
    }
    return filterList
}

function filterFormat(list, and) {
    var filter = ''
    for (let item in list) {
        if (filter)
            filter += and
        filter += list[item]
    }
    return filter
}

function EditPhoneNumber(number = '') {
    try {
        let l = number.length - 1;


    } catch (err) {
        console.log(`HATA: ${err}. Konum: EditPhoneNumber()`);

    }
}

function GetToday() {
    try {
        var today = new Date()
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
        today = JSON.stringify(today)
        today = today.slice(1, today.length - 1)
        return today
    } catch (err) {
        console.log(`Hata: ${err}. Konum: GetToday()/catch()`)
        return null
    }
}

export { SortingCustomer, EditDate, Reducer, OdataFilterFormat, unEditDate, fuseFilter, filterFormat, fuseFilterDirective, GetToday };