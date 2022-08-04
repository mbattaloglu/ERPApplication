import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({boxStyle, titleStyle, title, onClickHandler}) => { 
  return (
    <TouchableOpacity style={[styles.boxStyle, boxStyle]} onPress={onClickHandler}>
      <View>
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 12,
  },
  titleStyle: {
    fontSize: 18,
    color: 'white',
  },
});

export default CustomButton;