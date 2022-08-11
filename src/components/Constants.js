import { StyleSheet } from "react-native";

import ClickIcon from "../images/icons/Select.png"
import UserIcon from "../images/icons/user.png"
import LogoImage from "../images/logo.png"

//#region TabBar
import HomeIcon from "../images/icons/Tab/home.png"
import TransportIcon from "../images/icons/Tab/delivery.png"
import DirectiveIcon from "../images/icons/Tab/checked.png"
import SuppliersIcon from "../images/icons/Tab/budget.png"
import SettingsIcon from "../images/icons/Tab/settings.png"
//#endregion


const ThemeColors = {
    HeaderBar: '#3B57C4'
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
    settings: SettingsIcon
}

const Api = {
    link: 'http://193.53.103.178:5312/api'
}

const User = {
    token: '',
    id: 97209,
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