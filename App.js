import React, {useMemo, useState} from 'react';
import Login from './src/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from './Context';
import {User, ThemeColors} from './src/constants/Constants';
import MainMenu from './src/MainMenu';
import BankStatement from './src/BankStatement';

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState('');

  const authContext = useMemo(() => {
    return {
      signIn: ({token}) => {
        setUserToken(token);
        User.token = token;
      },
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <MainStack.Navigator>
            <MainStack.Screen
              options={{
                title: 'Ana Menü',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
              }}
              name="MainMenu"
              component={MainMenu}
            />
             <MainStack.Screen
              name="BankStatement"
              component={BankStatement}
              options={{
                title: 'Hesap Ekstresi',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
              }}
            />
          </MainStack.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Giriş Yap',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
              }}
            />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
