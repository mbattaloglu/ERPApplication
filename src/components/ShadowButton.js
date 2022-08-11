import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ShadowButton = ({title}) => {
  return (
    <TouchableOpacity style={[styles.button]}>
      <View>
        <Text style={[styles.title]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShadowButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    elevation: 15,
    height: 70,
    width: 100,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
  },
});
