import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images, Icons} from './constants/Constants';
import MenuButton from './components/MenuButton';

const MainMenu = () => {
  return (
    <View style={styles.body}>
      <Image source={Images.LogoImage} styles={styles.logo} />
      <View style={styles.userLine}>
        <Image source={Icons.user} style={styles.userLogo} />
        <Text style={styles.userText}>BS-10 HUSAM ABDULHAMID MIZAL</Text>
      </View>
      <View style={styles.buttonGroup}>
        <MenuButton
          title={'Müşteri Sevk Listesi'}
          boxStyle={{backgroundColor: '#00D100'}}
        />
        <MenuButton
          title={'Talimatlarım'}
          boxStyle={{backgroundColor: '#FFB81C'}}
        />
        <MenuButton
          title={'Hesap Ekstresi'}
          boxStyle={{backgroundColor: '#30D5C8'}}
        />
        <MenuButton title={'Ayarlar'} boxStyle={{backgroundColor: '#DB4914'}} />
      </View>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  body: {
    marginTop : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 300,
    alignSelf: 'center',
  },
  userLine: {
    marginVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    width: '100%',
  },
});
