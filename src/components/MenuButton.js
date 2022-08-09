import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Icons} from '../constants/Constants';
import React from 'react';

const MenuButton = ({title, titleStyle, boxStyle, onClickHandler}) => {
  return (
    <TouchableOpacity
      style={[styles.boxStyle, boxStyle]}
      onPress={onClickHandler}>
      <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      <Image source={Icons.click} />
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  boxStyle: {
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 5,
  },
  titleStyle: {
    color: 'white',
    fontSize: 18,
  },
});
