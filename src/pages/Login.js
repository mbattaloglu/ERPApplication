import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../Context';
import { Api, User } from '../components/Constants';

const Login = ({ tab }) => {
  const { signIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loginHandler = async () => {
      const token = await fetch(
        Api.link + "/Authentication",
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            username: 'osmanportal',
            password: '123',
          }),
        },
      )
        .then(res => res.json())
        .then(res => res.token)
        .catch(error => console.log(error));
      if (token) {
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