import React, { useEffect, useMemo, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
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
import TransportDetails from "./src/pages/TransportDetails";
import Settings from "./src/pages/Settings";
import Filter from "./src/pages/Filter";
import TransportFilter from "./src/pages/Filters/TransportFilter";
import FilterDatas from "./src/pages/Filters/FilterDatas";
//#endregion


const TransportStack = createNativeStackNavigator();

const TransportScreen = ({navigation}) => {
  return (
    <TransportStack.Navigator screenOptions={{
      headerShown: true
    }}>
      <TransportStack.Screen
        name="TransportList"
        component={TransportList}
        options={{
          title: 'Müşteri Sevk Listesi',
          headerStyle: {
            backgroundColor: ThemeColors.transportList.HeaderBar,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("TransportFilter")}>
              <Image source={Icons.filter} style={{ height: 20, width: 20, tintColor: 'white' }} />
            </TouchableOpacity>
          )
        }}
      />
      <TransportStack.Screen
        name="TransportDetails"
        component={TransportDetails}
        options={{
          title: 'Sevk Detayları',
          headerStyle: {
            backgroundColor: ThemeColors.transportList.HeaderBar,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <TransportStack.Screen
        name="TransportFilter"
        component={TransportFilter}
        options={{
          title: 'Müşteri Sevk Listesi',
          headerStyle: {
            backgroundColor: ThemeColors.transportList.HeaderBar,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <TransportStack.Screen
        name="FilterDatas"
        component={FilterDatas}
        options={{
          title: 'Müşteri Sevk Listesi',
          headerStyle: {
            backgroundColor: ThemeColors.transportList.HeaderBar,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
    </TransportStack.Navigator>
  )
}

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
              tabBarActiveTintColor: 'gray',
            }}>
            <Tab.Screen
              name="MainMenu"
              component={MainMenu}
              options={{
                title: 'Ana Menü',
                headerStyle: {
                  backgroundColor: ThemeColors.Home.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.home}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.Home.HeaderBar : 'gray' }]}
                  />
                )
              }}

            />
            <Tab.Screen
              name="TransportScreen"
              component={TransportScreen}
              options={{
                title: 'Sevk Listesi',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.transport}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.transportList.HeaderBar : 'gray' }]}
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
                  backgroundColor: ThemeColors.directives.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.directive}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.directives.HeaderBar : 'gray' }]}
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
                  backgroundColor: ThemeColors.customerSuppliers.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.suppliers}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.customerSuppliers.HeaderBar : 'gray' }]}
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
                  backgroundColor: ThemeColors.Home.HeaderBar,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={Icons.settings}
                    style={[StylesAll.icon, { tintColor: focused ? ThemeColors.Home.HeaderBar : 'gray' }]}
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