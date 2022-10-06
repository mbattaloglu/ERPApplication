import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../Context';
import { GetToken } from '../components/ApiFunctions';
import { Api } from '../components/Constants';

const Login = ({ tab }) => {
  const { signIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loginHandler = async () => {
      const token = await GetToken(
        {
          api: await AsyncStorage.getItem("api"),
          username: await AsyncStorage.getItem("username"),
          password: await AsyncStorage.getItem("password")
        }
      )
      if (token) {
        Api.link = await AsyncStorage.getItem("api");
        signIn({ token });
        setLoading(false);
      } else {
        alert('Kullanıcı adı veya şifre hatalı');
      }
    };

    loginHandler().catch(err => console.log(err));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: "black"
  },
});

export default Login;