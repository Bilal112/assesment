import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import { Colors } from '@constants/Colors';

const LoginLayout = ({children, noSpacing}: any) => {

  const styles = Styles(noSpacing);

  return (

      <SafeAreaView style={{flex: 1,backgroundColor:Colors.white}}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
  );
};

export default LoginLayout;

const Styles = noSpacing =>
  StyleSheet.create({
    backgroundImages: {
      flex: 1,
      backgroundColor:'white',
    },
    container: {
      flex: 1,
      paddingTop: noSpacing ? 0 : '10%',
      paddingHorizontal: noSpacing ? 0 : 19,
    },
  });
