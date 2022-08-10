import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TransportPaymentDirectivesInfoBox from './components/TransportPaymentDirectivesInfoBox';
import {User} from './constants/Constants';

const BankStatement = ({navigation}) => {
  useEffect(() => {
    fetch(
      User.API +
    "/api/odata/TransportPaymentDirectives/97209/GetCustomerTransportPaymentDirective()?$top=5&",
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
  const [data, setData] = useState([]);

  return (
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
