import { StyleSheet } from "react-native";

import ClickIcon from "../images/icons/Select.png"
import UserIcon from "../images/icons/user.png"
import LogoImage from "../images/logo.png"
import CalendarIcon from "../images/icons/calendar.png"
import SearchIcon from "../images/icons/search.png"
import NextIcon from "../images/icons/next.png"

//#region TabBar
import HomeIcon from "../images/icons/Tab/home.png"
import TransportIcon from "../images/icons/Tab/delivery.png"
import DirectiveIcon from "../images/icons/Tab/checked.png"
import SuppliersIcon from "../images/icons/Tab/budget.png"
import SettingsIcon from "../images/icons/Tab/settings.png"
//#endregion


const ThemeColors = {
    transportList: {
        HeaderBar: '#8c2f39',
        SubHeaderBar: '#b23a48'
    },
    directives: {
        HeaderBar: '#2d6a4f',
        SubHeaderBar: '#40916c'
    },
    customerSuppliers: {
        HeaderBar: '#023e8a',
        SubHeaderBar: '#0077b6'
    },
    Home: {
        HeaderBar: '#33415c',
        SubHeaderBar: '#5c677d'
    }
    
}

const Images = {
    LogoImage: LogoImage
}

const Icons = {
    click: ClickIcon,
    user: UserIcon,
    home: HomeIcon,
    transport: TransportIcon,
    directive: DirectiveIcon,
    suppliers: SuppliersIcon,
    settings: SettingsIcon,
    calendar: CalendarIcon,
    search: SearchIcon,
    next: NextIcon
}

const Api = {
    link: 'http://193.53.103.178:5312/api'
}

const User = {
    token: '',
    id: 97209,
    defaultCurrencyType: '',
    username: '',
    password: '',
}

const StylesAll = StyleSheet.create({
    icon: {
        height: 30,
        width: 30,

    }
})

export {ThemeColors, Icons, Images, User, Api, StylesAll};