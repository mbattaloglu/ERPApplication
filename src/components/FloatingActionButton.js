import {StyleSheet, TouchableOpacity} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import React from 'react';
import {ThemeColors} from '../constants/Constants';

const FloatingActionButton = ({onClickHandler}) => {
  return (
    <TouchableOpacity style={styles.boxStyle} onPress={onClickHandler}>
      <FontistoIcon name="plus-a" size={20} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: ThemeColors.HeaderBar,
    borderRadius: 100,
  },
});

export default FloatingActionButton;
