import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MyProfileProps {}

const MyProfile = (props: MyProfileProps) => {
  return (
    <View style={styles.container}>
      <Text>MyProfile</Text>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {}
});
