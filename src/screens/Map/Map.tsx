import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MapProps {}

const Map = (props: MapProps) => {
  return (
    <View style={styles.container}>
      <Text>map</Text>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {}
});
