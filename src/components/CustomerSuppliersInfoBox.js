import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomerSuppliersInfoBox = ({
  date,
  description,
  type,
  oid,
  currency,
  money,
  boxStyle,
  isDebt = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.box,
        boxStyle,
        isDebt ? styles.debtBox : styles.receivingsBox,
      ]}>
      <View style={styles.line}>
        <Text style={[styles.titleText]}>Tarih</Text>
        <Text style={[styles.text]}>{date}</Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.titleText]}>Açıklama</Text>
        <Text style={[styles.text]}>{description}</Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.titleText]}>Tipi</Text>
        <Text style={[styles.text]}>{type}</Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.titleText]}>Talimat Numarası</Text>
        <Text style={[styles.text]}>{oid}</Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.titleText]}>Para Birimi</Text>
        <Text style={[styles.text]}>{currency}</Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.titleText]}>{isDebt ? 'Borç' : 'Alacak'}</Text>
        <Text style={[styles.text]}>{money}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerSuppliersInfoBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 2.5,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    minHeight: 325,
  },
  debtBox: {
    borderColor: 'red',
  },
  receivingsBox: {
    borderColor: 'green',
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
