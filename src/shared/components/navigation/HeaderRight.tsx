import React from 'react';
import {StyleSheet} from 'react-native';
import HomeHeaderBtn from '../../../screens/Home/HomeHeaderBtn';

export default function HeaderLeft({route}) {
  let name = route?.name;

  if (name === 'Home') {
    return <HomeHeaderBtn />;
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  leftView: {
    marginHorizontal: 16,
  },
});
