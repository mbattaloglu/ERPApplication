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
import ArrowIcon from "../images/icons/arrow.png"
import PlusIcon from "../images/icons/plus.png"

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
        HeaderBar: '#DD2C2F',
        SubHeaderBar: '#E35053',
        SecondSubHeaderBar: '#EB8587'
    },
    directives: {
        HeaderBar: '#006400',
        SubHeaderBar: '#007200',
        SecondSubHeaderBar: '#77A677'
    },
    customerSuppliers: {
        HeaderBar: '#0353A4',
        SubHeaderBar: '#0466C8',
        SecondSubHeaderBar: '#5995D1'
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
    arrow: ArrowIcon,
    plus: PlusIcon,
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
    },
    profileCard: {
        marginVertical: '2%',
        marginHorizontal: '3%',
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: '4%',
        paddingVertical: '2%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export { ThemeColors, Icons, Images, User, Api, StylesAll };