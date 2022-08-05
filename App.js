import React, { useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./src/pages/MainMenu";
import Login from "./src/pages/Login";
import { ThemeColors, User } from "./src/components/Constants";
import { AuthContext } from "./Context";
import BankStatement from "./src/pages/BankStatement";

const MainStack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();

// Müşteri Sevk Listesi /api/odata/TransportCards?$top=1&$select=SenderName,Oid,DocumentDate,TotalPackingQuantity

const App = () => {

  const [userToken, setUserToken] = useState('');

  const authContext = useMemo(() => {
    return {
      signIn: ({ token }) => {
        setUserToken(token);
        User.token = token;
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <MainStack.Navigator>
            <MainStack.Screen
              name="MainMenu"
              component={MainMenu}
              options={{
                title: 'Giriş Yap',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
              }}
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
                  backgroundColor: ThemeColors.HeaderBar
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
              }}
            />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;