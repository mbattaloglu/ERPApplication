import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from './components/InputField';
import {User} from './constants/Constants';

const Settings = () => {
  return (
    <View style={styles.container}>
      <InputField title={"API"} value={User.API}/>
      <InputField title={"Kullanıcı Adı"} value={User.username}/>
      <InputField title={"Şifre"} safeTextEntry value={User.password}/>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop : 20,
    },
});
