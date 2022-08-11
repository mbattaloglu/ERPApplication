import React, {useEffect, useState, useLayoutEffect} from 'react';
import {TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import FloatingActionButton from './components/FloatingActionButton';
import TransportPaymentDirectivesInfoBox from './components/TransportPaymentDirectivesInfoBox';
import {User} from './constants/Constants';
import FeatherIcons from 'react-native-vector-icons/Feather';

const BankStatement = ({navigation}) => {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={[{marginRight: 10}]} onPress={filterHandler}>
          <FeatherIcons name="filter" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    fetch(
      User.API +
        '/api/odata/TransportPaymentDirectives/97209/GetCustomerTransportPaymentDirective()?$top=5&',
      {
        headers: {
          Authorization: 'Bearer ' + User.token,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(res => setData(res.value));
  }, []);

  const filterHandler = () => {
    alert('Filter');
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <TransportPaymentDirectivesInfoBox
            date={item.Date.slice(0, 10)}
            description={item.Desc}
            directiveNumber={item.Code}
            currency={'-PLACEHOLDER-'}
            amount={item.Amount}
            status={item.TPDPaymentStatus === 'Paid' ? 'Onaylı' : 'Onaysız'}
            boxStyle={index % 2 == 0 ? styles.boxEven : styles.boxOdd}
          />
        )}
      />
      <FloatingActionButton />
    </>
  );
};

export default BankStatement;

const styles = StyleSheet.create({
  boxOdd: {
    backgroundColor: 'lightgray',
  },
  boxEven: {
    backgroundColor: 'white',
  },
});
