import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const TransportCardInfoBox = ({
  carNo,
  company,
  orderId,
  date,
  totalPackingQuantity,
  boxStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.box, boxStyle]}>
      <View style={styles.line}>
        <Text style={styles.titleText}>Araç No</Text>
        <Text style={styles.text}>{carNo}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Firma</Text>
        <Text style={styles.text}>{company}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Fiş Numarası</Text>
        <Text style={styles.text}>{orderId}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Tarih</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Ambalaj</Text>
        <Text style={styles.text}>{totalPackingQuantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransportCardInfoBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 2.5,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    minHeight: 333,
  },
  line: {
    paddingLeft: 10,
    minHeight: 40,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    color: 'black',
    paddingLeft: 10,
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
