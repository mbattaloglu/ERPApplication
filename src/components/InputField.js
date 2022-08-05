import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputField = ({title, safeTextEntry=false, command}) => {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={styles.inputArea} secureTextEntry={safeTextEntry} onChangeText={command}/>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 20,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  inputArea: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
  },
});