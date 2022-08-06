import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from './components/CustomButton';
import InputField from './components/InputField';
import {AuthContext} from '../Context';

const Login = () => {
  const {signIn} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const loginHandler = async () => {
    const token = await fetch('http://193.53.103.178:5312/api/Authentication', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        //username: username,
        //password: password,
        username : "osmanportal",
        password : "123"
      }),
    })
      .then(res => res.json())
      .then(res => res.token)
      .catch(error => console.log(error));
    if (token) {
      signIn({token});
      console.log(token);
    } else {
      alert("Kullanıcı adı veya şifre hatalı");
    }
  };

  return (
    <View>
      <View style={{marginTop: 40, marginBottom: 40}}>
        <InputField title={'Kullanıcı Adı'} onChangeHandler={value => {setUsername(value)}} />
        <InputField safeTextEntry title={'Şifre'} onChangeHandler={value => {setPassword(value)}}/>
      </View>
      <CustomButton
        boxStyle={styles.buttonBox}
        title={'Giriş Yap'}
        onClickHandler={loginHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttonBox: {
    alignSelf: 'flex-end',
    marginEnd: 20,
  },
});

export default Login;
