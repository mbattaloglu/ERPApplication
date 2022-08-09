import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TransportCardInfoBox from './components/TransportCardInfoBox';
import {User} from './constants/Constants';

const BankStatement = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://193.53.103.178:5312/api/odata/TransportCards?$top=5&', {
      headers: {
        Authorization: 'Bearer ' + User.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => res.value)
      .then(res => setData(res));
  }, []);

  const checkIndexIsEven = index => {
    return index % 2 == 0;
  };

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <TransportCardInfoBox
          carNo="-PLACEHOLDER-"
          company={item.SenderName}
          orderId={item.Oid}
          date={item.ShipmentDate.slice(0, 10)}
          totalPackingQuantity={item.TotalPackingQuantity}
          boxStyle={index % 2 == 0 ? styles.boxEven : styles.boxOdd}
        />
      )}
    />
  );
};

export default BankStatement;
/*
renderItem={({ item }) => (
                <TransportCardInfoBox 
                carNo="-PLACEHOLDER-"
                company = {item.SenderName}
                orderId = {item.Oid}
                date = {item.ShipmentDate.slice(0, 10)}
                totalPackingQuantity = {item.TotalPackingQuantity}
                boxStyle={(index % 2 == 0) ? styles.boxEven : styles.boxOdd}
                />
            )} */

const styles = StyleSheet.create({
  boxOdd: {
    backgroundColor: 'lightblue',
  },
  boxEven: {
    backgroundColor: 'white',
  },
});
