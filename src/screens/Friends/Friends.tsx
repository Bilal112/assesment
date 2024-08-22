import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface FriendsProps {}

const Friends = (props: FriendsProps) => {
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {}
});
