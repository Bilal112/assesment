import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

export default function HeaderTitle({colors, name, children}) {
  const headerText = useSelector((state: any) => state.utils.headerText);

  return <Text></Text>;
  
}
