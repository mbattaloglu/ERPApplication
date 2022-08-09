import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const InfoBox = ({
  date,
  description,
  directiveNumber,
  currency,
  amount,
  status,
  boxStyle,
}) => {
  return (
    <View style={[styles.box, boxStyle]}>
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
          <Text style={styles.text}>Açıklama</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{description}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Talimat No</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{directiveNumber}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Para Birimi</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{currency}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Talimat Tutarı</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{amount}</Text>
        </View>
      </View>
      <View style={styles.line}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Onay Durumu</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

export default InfoBox;

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
