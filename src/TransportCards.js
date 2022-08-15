import React, {useEffect, useState, useLayoutEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import TransportCardInfoBox from './components/TransportCardInfoBox';
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
    fetch(User.API + '/api/odata/TransportCards?$select=Oid,SenderName,DocumentDate,TotalPackingQuantity&$expand=TransportWaybill($select=declarationNumber)&$top=5', {
      headers: {
        Authorization: 'Bearer ' + User.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => res.value)
      .then(res => setData(res));
  }, []);

  const filterHandler = () => {
    alert('Filter');
  };


  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <TransportCardInfoBox
          carNo={item.TransportWaybill.declarationNumber}
          company={item.SenderName}
          orderId={item.Oid}
          date={item.DocumentDate.slice(8,10) + "." + item.DocumentDate.slice(5,7) + "." + item.DocumentDate.slice(0,4)}
          totalPackingQuantity={item.TotalPackingQuantity}
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
