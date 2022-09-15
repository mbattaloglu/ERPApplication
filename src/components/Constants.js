import { StyleSheet } from "react-native";

import ClickIcon from "../images/icons/Select.png"
import UserIcon from "../images/icons/user.png"
import LogoImage from "../images/logo.png"
import CalendarIcon from "../images/icons/calendar.png"
import SearchIcon from "../images/icons/search.png"
import NextIcon from "../images/icons/next.png"
import DetailsIcon from "../images/icons/details.png"
import ImageIcon from "../images/icons/image.png"
import FilterIcon from "../images/icons/filter.png"
import CancelIcon from "../images/icons/cancel.png"
import PhoneIcon from "../images/icons/phone.png"

//#region OutLine
import HomeIcon_OutLine from "../images/icons/OutLine/home.png"
import TransportsIcon_OutLine from "../images/icons/OutLine/transports.png"
import DirectivesIcon_OutLine from "../images/icons/OutLine/directives.png"
import SuppliersIcon_OutLine from "../images/icons/OutLine/suppliers.png"
import SettingsIcon_OutLine from "../images/icons/OutLine/settings.png"
//#endregion

//#region Fill
import HomeIcon_Fill from "../images/icons/Fill/home.png"
import TransportsIcon_Fill from "../images/icons/Fill/transports.png"
import DirectivesIcon_Fill from "../images/icons/Fill/directives.png"
import SuppliersIcon_Fill from "../images/icons/Fill/suppliers.png"
import SettingsIcon_Fill from "../images/icons/Fill/settings.png"
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
    calendar: CalendarIcon,
    search: SearchIcon,
    next: NextIcon,
    details: DetailsIcon,
    image: ImageIcon,
    filter: FilterIcon,
    cancel: CancelIcon,
    phone: PhoneIcon,
    outLine: {
        home: HomeIcon_OutLine,
        transports: TransportsIcon_OutLine,
        directives: DirectivesIcon_OutLine,
        suppliers: SuppliersIcon_OutLine,
        settings: SettingsIcon_OutLine
    },
    fill: {
        home: HomeIcon_Fill,
        transports: TransportsIcon_Fill,
        directives: DirectivesIcon_Fill,
        suppliers: SuppliersIcon_Fill,
        settings: SettingsIcon_Fill
    },
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

export { ThemeColors, Icons, Images, User, Api, StylesAll };