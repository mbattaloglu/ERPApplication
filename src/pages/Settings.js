import { Keyboard, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { GetToken } from '../components/ApiFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Context';

const Settings = () => {
  const { memory } = React.useContext(AuthContext)

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [api, setApi] = React.useState('');

  async function GetMemory() {
    setApi(await AsyncStorage.getItem("api"));
    setUsername(await AsyncStorage.getItem("username"));
    setPassword(await AsyncStorage.getItem("password"));
  }

  const tempValues = {
    api: api,
    username: username,
    password: password,
  }

  React.useEffect(() => {
    GetMemory();
  }, []);

  async function IsThatTrue() {
    Keyboard.dismiss()
    console.log("selam")
    const currValue = {
      api: tempValues.api,
      username: tempValues.username,
      password: tempValues.password
    }
    const token = await GetToken({
      api: currValue.api,
      username: currValue.username,
      password: currValue.password
    })
    console.log(token)
    if (token) {
      await AsyncStorage.setItem("api", currValue.api)
      await AsyncStorage.setItem("username", currValue.username)
      console.log("asdasdasdsad: ", currValue.username)
      await AsyncStorage.setItem("password", currValue.password)
      memory()
    }
    else {
      alert("Hatalı")
    }
  };

  return (
    <ScrollView style={styles.container}>
      <InputField
        title={'API'}
        value={api}
        onChangeHandler={(value) => tempValues.api = value}
      />
      <InputField
        title={'Kullanıcı Adı'}
        value={username}
        onChangeHandler={(value) => tempValues.username = value}
      />
      <InputField
        title={'Şifre'}
        safeTextEntry
        value={password}
        onChangeHandler={(value) => tempValues.password = value}
      />
      <CustomButton
        title={'Kaydet'}
        boxStyle={styles.button}
        onClickHandler={IsThatTrue}
      />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  button: {
    alignSelf: 'center',
  },
});

export default Settings;