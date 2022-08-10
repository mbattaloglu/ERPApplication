import {StyleSheet, View} from 'react-native';
import React from 'react';
import InputField from './components/InputField';
import CustomButton from './components/CustomButton';
import {User} from './constants/Constants';

const Settings = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [api, setApi] = React.useState('');

  React.useEffect(() => {
    setUsername(User.username);
    setPassword(User.password);
    setApi(User.API);
  }, []);

  const submitInfos = () => {
    User.username = username;
    User.password = password;
    User.API = api;
  };

  return (
    <View style={styles.container}>
      <InputField title={'API'} value={api} onChangeHandler={setApi} />
      <InputField
        title={'Kullanıcı Adı'}
        value={username}
        onChangeHandler={setUsername}
      />
      <InputField
        title={'Şifre'}
        safeTextEntry
        value={password}
        onChangeHandler={setPassword}
      />
      <CustomButton
        title={'Kaydet'}
        boxStyle={styles.button}
        onClickHandler={submitInfos}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  button: {
    alignSelf: 'center',
  },
});
