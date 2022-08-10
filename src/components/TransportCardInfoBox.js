import {StyleSheet, Text, View} from 'react-native';
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
    <View style={[styles.box, boxStyle]}>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Araç No</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{carNo}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Firma</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{company}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Fiş Numarası</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{orderId}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Tarih</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{date}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Ambalaj</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{totalPackingQuantity}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransportCardInfoBox;

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
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});
