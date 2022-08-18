import React, {useMemo, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

import {AuthContext} from './Context';
import {User, ThemeColors} from './src/constants/Constants';

import Login from './src/Login';
import MainMenu from './src/Home';
import TransportPaymentDirectives from './src/TransportPaymentDirectives';
import CustomerSuppliers from './src/CustomerSuppliers';
import Settings from './src/Settings';
import TransportCardStack from './src/TransportCardStack';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const {width, height} = Dimensions.get('window');
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
          <View
            style={{
              width,
              height,
            }}>
            <Tab.Navigator
              initialRouteName="MainMenu"
              screenOptions={{
                tabBarActiveTintColor: ThemeColors.HeaderBar,
              }}>
              <Tab.Screen
                options={{
                  title: 'Ana Menü',
                  headerStyle: {
                    backgroundColor: ThemeColors.HeaderBar,
                  },
                  headerTintColor: 'white',
                  headerTitleAlign: 'center',
                  tabBarIcon: ({focused}) => (
                    <Ionicons
                      name="home-sharp"
                      size={24}
                      style={{color: focused ? ThemeColors.HeaderBar : 'gray'}}
                    />
                  ),
                }}
                name="MainMenu"
                component={MainMenu}
              />
              <Tab.Screen
                name="TransportCardStack"
                component={TransportCardStack}
                options={{
                  title : 'Müşteri Sevk Listesi',
                  headerShown : false,
                  tabBarIcon: ({focused}) => (
                    <FontAwesome5Icons
                      name="shipping-fast"
                      size={24}
                      style={{color: focused ? ThemeColors.HeaderBar : 'gray'}}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="TransportPaymentDirectives"
                component={TransportPaymentDirectives}
                options={{
                  title: 'Talimatlar',
                  headerStyle: {
                    backgroundColor: ThemeColors.HeaderBar,
                  },
                  headerTintColor: 'white',
                  headerTitleAlign: 'center',
                  tabBarIcon: ({focused}) => (
                    <EntypoIcons
                      name="direction"
                      size={24}
                      style={{color: focused ? ThemeColors.HeaderBar : 'gray'}}
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
                  tabBarIcon: ({focused}) => (
                    <Ionicons
                      name="document-text"
                      size={24}
                      style={{color: focused ? ThemeColors.HeaderBar : 'gray'}}
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
                  tabBarIcon: ({focused}) => (
                    <Ionicons
                      name="settings"
                      size={24}
                      style={{color: focused ? ThemeColors.HeaderBar : 'gray'}}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </View>
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
