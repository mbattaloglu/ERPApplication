import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './components/Header';
import CustomButton from './components/CustomButton';
import InputField from './components/InputField';

const Login = () => {
  const fetchData = async () => {
    await fetch('http://193.53.103.178:5312/login/venut', {
      method: 'POST',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({
        username: 'osmanportal',
        password: 123,
      }),
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (
    <View>
      <Header title={"Giriş Yap"}/>
      <View style={{marginTop : 40, marginBottom : 40}}>
      <InputField title={'Kullanıcı Adı'} />
      <InputField safeTextEntry title={'Şifre'} />
      </View>
      <CustomButton boxStyle={styles.buttonBox} title={'Giriş Yap'} onClickHandler={() => {console.log("Hello")}} />
    </View>
  );
}
const styles  = StyleSheet.create({
  buttonBox  : {
    alignSelf : "flex-end",
    marginEnd : 20,
  },
});

export default Login;
