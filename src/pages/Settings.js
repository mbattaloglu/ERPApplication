import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import React from 'react';
import InputField from '../components/Visuals/InputField';
import CustomButton from '../components/Visuals/CustomButton';
import { User, Api } from '../components/Constants';
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
    if (token) {
      await AsyncStorage.setItem("api", currValue.api)
      await AsyncStorage.setItem("username", currValue.username)
      await AsyncStorage.setItem("password", currValue.password)
      memory()
    }
    else {
      Alert.alert(
        "Hata",
        "Eksik ya da hatalı bilgi girdiniz.",
        [
            {
                text: "Tamam",
            }
        ]
    )
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
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