import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransportCardDetail from './TransportCardDetail';
import TransportCards from './TransportCards';
import {ThemeColors} from './constants/Constants';

const Stack = createNativeStackNavigator();

const TransportCardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransportCards"
        component={TransportCards}
        options={{
          title: 'Müşteri Sevk Listesi',
          headerStyle: {
            backgroundColor: ThemeColors.HeaderBar,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="TransportCardDetail"
        component={TransportCardDetail}
        options={{
          title: 'Sevk Detayları',
          headerStyle: {
            backgroundColor: ThemeColors.HeaderBar,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default TransportCardStack;
