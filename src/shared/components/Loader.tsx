import React from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import Colors from '@utils/theme';
import {useSelector} from 'react-redux';
import {IColors} from '@constants/Interfaces';

interface ILoader {
  size?: any;
  color?: string;
  style?: any;
  logo?: boolean;
  center?: boolean;
}

export default function Loader({
  size = 'large',
  color,
  style,
  logo = false,
  center = true,
}: ILoader) {
  const colors: IColors = Colors();
  const themeDark = useSelector((state: any) => state.utils.dark);

  if (logo)
    return (
      <Image
        style={{width: 150, alignSelf: 'center'}}
        source={
          themeDark
            ? require('../../assets/loading/loader.gif')
            : require('../../assets/loading/loader.gif')
        }
        resizeMode={'contain'}
      />
    );
  else if (center)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator
          size={size}
          color={color || colors.primary}
          style={style}
        />
      </View>
    );
  else
    return (
      <ActivityIndicator
        size={size}
        color={color || colors.primary}
        style={style}
      />
    );
}
