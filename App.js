import React, { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainMenu from "./src/pages/MainMenu";
import Login from "./src/pages/Login";
import { ThemeColors, User, Icons, StylesAll } from "./src/components/Constants";
import { AuthContext } from "./Context";

//#region Pages
import CustomerSuppliers from "./src/pages/CustomerSuppliers";
import Directives from "./src/pages/Directives";
import TransportList from "./src/pages/TransportList";
import Settings from "./src/pages/Settings";
import Filter from "./src/pages/Filter";
//#endregion

//const MainStack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Müşteri Sevk Listesi /api/odata/TransportCards?$top=1&$select=SenderName,Oid,DocumentDate,TotalPackingQuantity

const App = () => {

  const [userToken, setUserToken] = useState('');

  const authContext = useMemo(() => {
    return {
      signIn: ({ token }) => {
        setUserToken(token);
        User.token = token;
      },
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <Tab.Navigator
            initialRouteName="MainMenu"
            screenOptions={{
              tabBarActiveTintColor: ThemeColors.HeaderBar,
            }}>
            <Tab.Screen
              name="MainMenu"
              component={MainMenu}
              options={{
                title: 'Ana Menü',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.home}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.HeaderBar : 'gray' }]}
                  />
                )
              }}

            />
            <Tab.Screen
              name="TransportList"
              component={TransportList}
              options={{
                title: 'Sevk Listesi',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.transport}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.HeaderBar : 'gray' }]}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Directives"
              component={Directives}
              options={{
                title: 'Talimatlarım',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.directive}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.HeaderBar : 'gray' }]}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="CustomerSuppliers"
              component={CustomerSuppliers}
              options={{
                title: 'Hesap Ekstresi',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.suppliers}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.HeaderBar : 'gray' }]}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                title: 'Ayarlar',
                headerStyle: {
                  backgroundColor: ThemeColors.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.settings}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.HeaderBar : 'gray' }]}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <AuthStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <AuthStack.Screen name="Login" component={Login} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;