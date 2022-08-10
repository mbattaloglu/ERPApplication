import {StyleSheet, Text, View} from 'react-native';
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
    <View style={[styles.box, boxStyle]}>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>Tarih</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>{date}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>Açıklama</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>{description}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>Tipi</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>{type}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>Talimat Numarası</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>{oid}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>Para Birimi</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>{currency}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>Borç</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={[styles.text, isDebt ? styles.debtText : styles.receivingsText]}>{money}</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomerSuppliersInfoBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  line: {
    flexDirection: 'row',
    height: 40,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor : "white",
  },
  titleBox: {
    width: 130,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  infoBox: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  debtText: {
    color: 'red',
    fontWeight: 'bold',
  },
  receivingsText: {
    color: 'green',
    fontWeight: 'bold',
  },
});
