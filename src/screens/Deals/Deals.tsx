import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface DealsProps {}

const Deals = (props: DealsProps) => {
  return (
    <View style={styles.container}>
      <Text>Deals</Text>
    </View>
  );
};

export default Deals;

const styles = StyleSheet.create({
  container: {}
});
