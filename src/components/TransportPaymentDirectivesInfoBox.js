import {
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const TransportPaymentDirectivesInfoBox = ({
  date,
  description,
  directiveNumber,
  currency,
  amount,
  status,
  boxStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.box, boxStyle]}>
      <View style={styles.line}>
        <Text style={styles.titleText}>Tarih</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Açıklama</Text>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Talimat No</Text>
        <Text style={styles.text}>{directiveNumber}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Para Birimi</Text>
        <Text style={styles.text}>{currency}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Talimat Tutarı</Text>
        <Text style={styles.text}>{amount}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.titleText}>Onay Durumu</Text>
        <Text style={styles.text}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransportPaymentDirectivesInfoBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 3,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    minHeight: 397,
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
