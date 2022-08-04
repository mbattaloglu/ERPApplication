import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    position: 'relative',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
});

export default Header;
