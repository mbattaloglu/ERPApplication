import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { User } from '../components/Constants';
import { AuthContext } from '../../Context';

const Login = () => {

  const { signIn } = useContext(AuthContext);

  const fetchData = async () => {
    
    const token = await fetch('http://193.53.103.178:5312/api/Authentication', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(res => res.token)
      .catch((e) => console.log("Hata: ", e))

    if (token) {
      signIn({token})
    }
    else {
      alert("Kullanıcı adı veya şifre hatalı!")
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setUsername('osmanportal');
    setPassword('123');
  }, [])

  return (
    <View>
      <View style={{ marginTop: 40, marginBottom: 40 }}>
        <InputField title={'Kullanıcı Adı'} command={value => { setUsername(value) }}/>
        <InputField safeTextEntry title={'Şifre'} command={value => { setPassword(value) }}/>
      </View>
      <CustomButton boxStyle={styles.buttonBox} title={'Giriş Yap'} onClickHandler={() => { fetchData() }} />
    </View>
  );
}
const styles = StyleSheet.create({
  buttonBox: {
    alignSelf: "flex-end",
    marginEnd: 20,
  },
  inputBox: {
    marginBottom: 20,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  inputArea: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
  },
});

export default Login;